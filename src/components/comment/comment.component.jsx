import { faMinus, faPlus, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { getAuthorName } from "../../firebase/firebase.utils";
import { countTime } from "../../timeCountHelper";
import DeletePostButton from "../delete-post-button/delete-post-button.component";
import EditPostButton from "../edit-post-button/edit-post-button.component";
import RatingBox from "../rating-box/rating-box.component";
import ReplyLink from "../reply-link/reply-link.component";
import styles from "./comment.module.css";

const Comment = ({
  id,
  author,
  content,
  time,
  replyReference,
  setReplyReference,
  owner,
  postAuthor,
  postId,
  commentSectionRef,
}) => {
  const authorName = useRef();
  const contentBlock = useRef();
  const contentWrapper = useRef();
  const [isEnoughSpace, setIsEnoughSpace] = useState();
  const [isExposed, setIsExposed] = useState(false);

  const isEditTimePassed = Math.floor((Date.now() - time) / 1000 / 60) > 15;
  const countedTime = countTime(time);

  useEffect(() => {
    getAuthorName(author).then((name) => {
      authorName.current.innerText = name;
    });
    if (contentBlock.current) {
      contentBlock.current.innerHTML = content.replaceAll("\n", "<br />");
      setIsEnoughSpace(
        contentBlock.current.scrollHeight > contentWrapper.current.offsetHeight
      );
    }
  }, [author, content]);

  const handleExpose = () => {
    contentWrapper.current.classList.toggle(styles.exposed);
    setIsExposed(!isExposed);
  };

  const handleReply = () => {
    setReplyReference(id);
  };
  return (
    <div className={styles.comment} forreplylink={id}>
      <div className={styles.postsHead}>
        <div className={styles.authorAndTime}>
          <h4 className={styles.author} ref={authorName}>
            user
          </h4>
          <h5 className={styles.time}>{countedTime}</h5>
          {replyReference ? (
            <ReplyLink
              replyReference={replyReference}
              postId={postId}
              commentSectionRef={commentSectionRef}
            />
          ) : null}
        </div>
        <div className={styles.manageBtns}>
          <div className={styles.replyBtn} onClick={handleReply}>
            <FontAwesomeIcon icon={faReply} className={styles.icon} />
          </div>
          {owner ? (
            <>
              {!isEditTimePassed ? (
                <EditPostButton
                  commentId={id}
                  postId={postId}
                  initialContent={content}
                />
              ) : null}
              <DeletePostButton postId={postId} commentId={id} />{" "}
            </>
          ) : postAuthor ? (
            <DeletePostButton postId={postId} commentId={id} />
          ) : null}
        </div>
      </div>
      <div ref={contentWrapper} className={styles.contentWrapper}>
        <p ref={contentBlock} className={styles.content}>
          {content}
        </p>
        {isEnoughSpace ? (
          <div className={styles.exposeContent} onClick={handleExpose}>
            <div className={styles.exposeBtn}>
              {!isExposed ? (
                <FontAwesomeIcon icon={faPlus} />
              ) : (
                <FontAwesomeIcon icon={faMinus} />
              )}
            </div>
          </div>
        ) : null}
      </div>
      <RatingBox postId={postId} commentId={id} />
    </div>
  );
};
export default Comment;
