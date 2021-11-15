import { useEffect, useRef } from "react";
import { getAuthorName } from "../../firebase/firebase.utils";
import { countTime } from "../../timeCountHelper";
import DeletePostButton from "../delete-post-button/delete-post-button.component";
import EditPostButton from "../edit-post-button/edit-post-button.component";
import RatingBox from "../rating-box/rating-box.component";
import styles from "./comment.module.css";

const Comment = ({
  id,
  author,
  content,
  time,
  replyReference,
  owner,
  postAuthor,
  postId,
}) => {
  const authorName = useRef();
  const contentBlock = useRef();

  const isEditTimePassed = Math.floor((Date.now() - time) / 1000 / 60) > 15;
  const countedTime = countTime(time);

  useEffect(() => {
    getAuthorName(author).then((name) => {
      authorName.current.innerText = name;
    });
    if (contentBlock.current) {
      contentBlock.current.innerHTML = content.replaceAll("\n", "<br />");
    }
  }, [author, content]);

  //   console.log(postId);
  return (
    <div className={styles.comment}>
      <div className={styles.postsHead}>
        <div className={styles.authorAndTime}>
          <h4 className={styles.author} ref={authorName}>
            user
          </h4>
          <h5 className={styles.time}>{countedTime}</h5>
        </div>
        {owner ? (
          <div className={styles.manageBtns}>
            {!isEditTimePassed ? (
              <EditPostButton
                commentId={id}
                postId={postId}
                initialContent={content}
              />
            ) : null}
            <DeletePostButton postId={postId} commentId={id} />{" "}
          </div>
        ) : postAuthor ? (
          <div className={styles.manageBtns}>
            <DeletePostButton postId={postId} commentId={id} />{" "}
          </div>
        ) : null}
      </div>
      <p className={styles.content} ref={contentBlock}>
        {content}
      </p>
      <RatingBox postId={postId} commentId={id} />
    </div>
  );
};
export default Comment;
