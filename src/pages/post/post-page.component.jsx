import {
  faChevronDown,
  faChevronUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { changeDbUserField } from "../../firebase/firebase.utils";
import {
  selectCurrentUser,
  selectUserAuth,
} from "../../redux/user/user.selectors";
import { countTime } from "../../timeCountHelper";
import { getPost } from "../homepage/testPostData";
import styles from "./post-page.module.css";

const PostPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userAuth = useSelector(selectUserAuth);
  const { postId } = useParams();
  const [userRate, setUserRate] = useState(currentUser?.rates[postId]);
  const { content, author, closeComments, comments, createdAt, rating, theme } =
    getPost(postId);
  const time = countTime(createdAt);
  console.log(currentUser?.rates);
  const handleRate = ({ target }) => {
    let currentRate = target.getAttribute("datatype");
    if (userRate === currentRate) {
      setUserRate("undefined");
      currentRate = "undefined";
      changeDbUserField(userAuth, {
        rates: { ...currentUser?.rates, [postId]: currentRate },
      });
    } else {
      setUserRate(currentRate);
      changeDbUserField(userAuth, {
        rates: { ...currentUser?.rates, [postId]: currentRate },
      });
    }
  };
  return (
    <div className={styles.contentblock}>
      <div className={styles.authorAndTime}>
        <h4 className={styles.author}>{author}</h4>
        <h5 className={styles.time}>{time}</h5>
      </div>
      <h1 className={styles.theme}>{theme}</h1>
      <p>{content}</p>
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
    </div>
  );
};
export default PostPage;
