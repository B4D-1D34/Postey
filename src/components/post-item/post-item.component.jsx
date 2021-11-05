import { faCommentAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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
  return (
    <div className={styles.postItem}>
      <Link to={`post/${id}`}>
        <div className={styles.description}>
          <h3>{author}</h3>
          <h3>{countTime(createdAt)}</h3>
          <h1>{theme}</h1>
          <p>{content}</p>
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
