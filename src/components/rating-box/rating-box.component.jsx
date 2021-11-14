import { useSelector } from "react-redux";
import {
  faChevronDown,
  faChevronUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  selectCurrentUser,
  selectUserAuth,
} from "../../redux/user/user.selectors";
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
import { postUpdateSuccess } from "../../redux/posts/posts.actions";

const RatingBox = ({ postId, commentId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userAuth = useSelector(selectUserAuth);
  const posts = useSelector(selectCurrentPosts);
  let { rating } = posts[postId];
  let userRate = currentUser?.rates[postId];
  if (commentId) {
    rating = posts[postId].comments[commentId].rating;
    userRate = currentUser?.rates[commentId];
  }
  const handleRate = ({ target }) => {
    if (!userAuth) {
      dispatch(updateFailure({ message: "You should be signed in!" }));
      return;
    }
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
        changeDbUserField(userAuth, {
          rates: { ...currentUser?.rates, [commentId]: currentRate },
        });
        changeDbCommentField(postId, commentId, {
          rating: rating + postRating,
        });
        dispatch(
          postUpdateSuccess({
            id: postId,
            data: {
              ...posts[postId],
              comments: {
                ...posts[postId].comments,
                [commentId]: {
                  ...posts[postId].comments[commentId],
                  rating: rating + postRating,
                },
              },
            },
          })
        );
        dispatch(
          currentUserUpdate({
            ...currentUser,
            rates: { ...currentUser.rates, [commentId]: currentRate },
          })
        );
      } else {
        changeDbUserField(userAuth, {
          rates: { ...currentUser?.rates, [postId]: currentRate },
        });
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
      }
    } catch (err) {
      dispatch(updateFailure({ message: "Sorry, something went wrong" }));
    }
  };
  return (
    <div className={styles.rating}>
      <div className={styles.iconBtn} datatype="true" onClick={handleRate}>
        <FontAwesomeIcon
          icon={faChevronUp}
          style={{
            color: `${userRate === "true" ? "rgb(165, 219, 85)" : ""}`,
          }}
          className={`${styles.icon} ${styles.upIcon}`}
        />
      </div>
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
      <div className={styles.iconBtn} datatype="false" onClick={handleRate}>
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            color: `${userRate === "false" ? "rgb(201, 0, 0)" : ""}`,
          }}
          className={`${styles.icon} ${styles.downIcon}`}
        />
      </div>
    </div>
  );
};
export default RatingBox;
