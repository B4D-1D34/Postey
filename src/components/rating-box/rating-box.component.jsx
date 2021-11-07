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
import { changeDbUserField } from "../../firebase/firebase.utils";
import { getPost } from "../../pages/homepage/testPostData";

import styles from "./rating-box.module.css";
import { useDispatch } from "react-redux";
import {
  currentUserUpdate,
  updateFailure,
} from "../../redux/user/user.actions";

const RatingBox = ({ postId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userAuth = useSelector(selectUserAuth);
  const { rating } = getPost(postId);
  const userRate = currentUser?.rates[postId];

  const handleRate = ({ target }) => {
    if (!userAuth) {
      dispatch(updateFailure({ message: "You should be signed in!" }));
      return;
    }
    let currentRate = target.getAttribute("datatype");

    if (userRate === currentRate) {
      currentRate = "undefined";
    }
    try {
      changeDbUserField(userAuth, {
        rates: { ...currentUser?.rates, [postId]: currentRate },
      });
      dispatch(
        currentUserUpdate({
          ...currentUser,
          rates: { ...currentUser.rates, [postId]: currentRate },
        })
      );
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
