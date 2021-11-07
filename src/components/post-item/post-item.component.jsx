import { faCommentAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuthorName } from "../../firebase/firebase.utils";
import { countTime } from "../../timeCountHelper";
import styles from "./post-item.module.css";

const PostItem = ({
  id,
  theme,
  author,
  rating,
  createdAt,
  content,
  commentsLength,
}) => {
  // let authorName;
  const authorName = useRef();
  useEffect(() => {
    if (author === "0JA9NqvvKoWFstaSCbBxjDifRxR2") {
      getAuthorName(author).then((name) => {
        authorName.current.innerText = name;
      });
    }
  }, []);
  return (
    <div className={styles.postItem}>
      <Link to={`post/${id}`}>
        <div className={styles.description}>
          <div className={styles.authorAndTime}>
            <h4 className={styles.author} ref={authorName}>
              {author}
            </h4>
            <h5 className={styles.time}>{countTime(createdAt)}</h5>
          </div>
          <h1 className={styles.theme}>{theme}</h1>
          <p className={styles.content}>{content}</p>
        </div>
      </Link>
      <div className={styles.stats}>
        <div className={styles.statsBtn}>
          <FontAwesomeIcon icon={faCommentAlt} className={styles.icon} />
          {commentsLength}
        </div>
        <div className={styles.statsBtn}>
          <FontAwesomeIcon icon={faStar} className={styles.icon} />
          {rating}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
