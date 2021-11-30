import { useSelector } from "react-redux";
import {
  faChevronDown,
  faChevronUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  changeDbCommentField,
  changeDbPostField,
  changeDbUserField,
} from "../../firebase/firebase.utils";

import styles from "./rating-box.module.css";
import { useDispatch } from "react-redux";
import {
  currentUserUpdate,
  updateFailure,
} from "../../redux/user/user.actions";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import {
  commentUpdate,
  postUpdateSuccess,
} from "../../redux/posts/posts.actions";
import { useState } from "react";

const RatingBox = ({ postId, commentId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const posts = useSelector(selectCurrentPosts);
  const [isProcessing, setIsProcessing] = useState(false);

  let { rating, author } = posts[postId];
  let userRate = currentUser?.rates[postId];
  if (commentId) {
    rating = posts[postId].comments[commentId].rating;
    userRate = currentUser?.rates[commentId];
    author = posts[postId].comments[commentId].author;
  }
  const handleRate = ({ target }) => {
    if (!currentUser) {
      dispatch(updateFailure({ message: "You should be signed in!" }));
      return;
    }
    setIsProcessing(true);

    let currentRate = target.getAttribute("datatype");
    let postRating = 0;
    if (
      (userRate === "true" && currentRate === "true") ||
      (!userRate && currentRate === "false")
    ) {
      postRating = -1;
    } else if (userRate === "true" && currentRate === "false") {
      postRating = -2;
    } else if (
      (userRate === "false" && currentRate === "false") ||
      (!userRate && currentRate === "true")
    ) {
      postRating = 1;
    } else if (userRate === "false" && currentRate === "true") {
      postRating = 2;
    }
    if (userRate === currentRate) {
      currentRate = "";
    }

    try {
      if (commentId) {
        //write into current user rates db
        changeDbUserField(currentUser.id, {
          rates: { ...currentUser?.rates, [commentId]: currentRate },
        }).then(() => {
          //write into receiver user notifications, order of keys in data object is important!! same user actions are not sended to notifications.
          if (currentUser.id !== author) {
            changeDbUserField(
              author,
              {
                notifications: {
                  sender: currentUser.id,
                  currentRate,
                  createdAt: new Date(),
                  refPostId: postId,
                  unseen: true,
                },
                id: `${commentId}${currentUser.id}`,
              },
              "partly"
            );
          }
          // ).then(() => {
          //write into comment's db, and dispatch to redux state
          changeDbCommentField(postId, commentId, {
            rating: rating + postRating,
          }).then((comment) => {
            dispatch(
              commentUpdate({
                data: {
                  postId,
                  commentId,
                  comment,
                },
              })
            );
            dispatch(
              currentUserUpdate({
                ...currentUser,
                rates: { ...currentUser.rates, [commentId]: currentRate },
              })
            );
            setIsProcessing(false);
          });
          // });
        });
      } else {
        //write into current user rates db
        changeDbUserField(currentUser.id, {
          rates: { ...currentUser?.rates, [postId]: currentRate },
        }).then(() => {
          //write into receiver user notifications, order of keys in data object is important!! same user actions are not sended to notifications.
          if (currentUser.id !== author) {
            changeDbUserField(
              author,
              {
                notifications: {
                  sender: currentUser.id,
                  currentRate,
                  createdAt: new Date(),
                  unseen: true,
                },
                id: `${postId}${currentUser.id}`,
              },
              "partly"
            );
          }
          // .then(() => {
          //write into posts's db, and dispatch to redux state
          changeDbPostField(postId, { rating: rating + postRating });
          dispatch(
            postUpdateSuccess({
              id: postId,
              data: { ...posts[postId], rating: rating + postRating },
            })
          );
          dispatch(
            currentUserUpdate({
              ...currentUser,
              rates: { ...currentUser.rates, [postId]: currentRate },
            })
          );
          setIsProcessing(false);
          // });
        });
      }
    } catch (err) {
      dispatch(updateFailure({ message: "Sorry, something went wrong" }));
    }
  };
  return (
    <div className={styles.rating}>
      <button
        className={styles.iconBtn}
        disabled={isProcessing}
        datatype="true"
        onClick={handleRate}
      >
        <FontAwesomeIcon
          icon={faChevronUp}
          style={{
            color: `${userRate === "true" ? "rgb(165, 219, 85)" : ""}`,
          }}
          className={`${styles.icon} ${styles.upIcon}`}
        />
      </button>
      <div className={styles.ratingIconBlock}>
        <FontAwesomeIcon
          icon={faStar}
          style={{
            color: `${
              rating > 0
                ? "rgb(165, 219, 85)"
                : rating < 0
                ? "rgb(201, 0, 0)"
                : ""
            }`,
          }}
          className={styles.icon}
        />
        {rating}
      </div>
      <button
        className={styles.iconBtn}
        disabled={isProcessing}
        datatype="false"
        onClick={handleRate}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            color: `${userRate === "false" ? "rgb(201, 0, 0)" : ""}`,
          }}
          className={`${styles.icon} ${styles.downIcon}`}
        />
      </button>
    </div>
  );
};
export default RatingBox;
