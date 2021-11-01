import { countTime } from "../../timeCountHelper";
import styles from "./post-item.module.css";

const PostItem = ({
  theme,
  author,
  rating,
  createdAt,
  content,
  commentsLength,
}) => {
  return (
    <div className={styles.postItem}>
      <h3>{author}</h3>
      <h3>{countTime(createdAt)}</h3>
      <h1>{theme}</h1>
      <p>{content}</p>
    </div>
  );
};

export default PostItem;
