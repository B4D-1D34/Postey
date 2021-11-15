import styles from "./comment-section.module.css";
import Comment from "../comment/comment.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const CommentSection = ({ comments, postAuthor, postId }) => {
  const currentUser = useSelector(selectCurrentUser);
  const modifyTime = (time) =>
    time?.seconds * 1000 + time?.nanoseconds / 1000000;
  return (
    <div className={styles.commentSection}>
      <h1>Comments</h1>
      {Object.keys(comments)
        .map((key) => ({ id: key, ...comments[key] }))
        .map(({ id, author, content, createdAt, replyReference }) => (
          <Comment
            key={id}
            id={id}
            author={author}
            content={content}
            replyReference={replyReference}
            time={modifyTime(createdAt)}
            owner={currentUser?.id === author}
            postAuthor={currentUser?.id === postAuthor}
            postId={postId}
          />
        ))}
    </div>
  );
};
export default CommentSection;
