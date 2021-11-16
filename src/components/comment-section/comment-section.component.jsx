import styles from "./comment-section.module.css";
import Comment from "../comment/comment.component";
import NewCommentForm from "../new-comment-form/new-comment-form.component";
import { useRef, useState } from "react";

const CommentSection = ({
  comments,
  postAuthor,
  postId,
  closeComments,
  currentUser,
}) => {
  const commentSection = useRef();
  const [replyReference, setReplyReference] = useState("");
  const modifyTime = (time) =>
    time?.seconds * 1000 + time?.nanoseconds / 1000000;
  return (
    <div ref={commentSection} className={styles.commentSection}>
      <h1>Comments</h1>
      {closeComments ? (
        <div className={styles.commentsClosed}>
          Ability to comment is limited by the author
        </div>
      ) : !currentUser ? (
        <div className={styles.commentsClosed}>
          You should be signed in to leave a comment
        </div>
      ) : (
        <NewCommentForm
          postId={postId}
          replyReference={replyReference}
          setReplyReference={setReplyReference}
        />
      )}
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
            setReplyReference={setReplyReference}
            commentSectionRef={commentSection}
          />
        ))}
    </div>
  );
};
export default CommentSection;
