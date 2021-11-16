import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createNewComment, getAuthorName } from "../../firebase/firebase.utils";
import { commentUpdate } from "../../redux/posts/posts.actions";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import { updateFailure } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import ResizableInput from "../resizable-input/resizable-input.component";
import styles from "./new-comment-form.module.css";

const NewCommentForm = ({ postId, replyReference, setReplyReference }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [content, setContent] = useState("");
  const posts = useSelector(selectCurrentPosts);
  const receiverName = useRef();

  const handleChange = ({ target }) => {
    const { value } = target;
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      dispatch(updateFailure({ message: "You can't post an empty message" }));
      return;
    }
    createNewComment({
      content,
      postId,
      author: currentUser.id,
      replyReference,
    })
      .then((comment) => {
        dispatch(
          commentUpdate({ data: { postId, commentId: comment.id, comment } })
        );

        setReplyReference("");
        setContent("");
      })
      .catch(({ message }) => dispatch(updateFailure({ message })));
  };

  const cancelReply = () => {
    setReplyReference("");
  };

  useEffect(() => {
    if (replyReference) {
      getAuthorName(posts[postId]?.comments[replyReference]?.author).then(
        (name) => {
          receiverName.current.innerText = `Reply to ${name}`;
        }
      );
    }
  }, [replyReference]);
  return (
    <form className={styles.newPostForm} onSubmit={handleSubmit}>
      <div className={styles.authorAndTheme}>
        <h4 className={styles.author}>{currentUser?.displayName}</h4>
        {replyReference ? (
          <div className={styles.reply}>
            <h5 ref={receiverName}></h5>
            <FontAwesomeIcon
              icon={faTimes}
              className={styles.icon}
              onClick={cancelReply}
            />
          </div>
        ) : null}
      </div>
      <ResizableInput handleChange={handleChange} content={content} />
      <div className={styles.submitGroup}>
        <button className={styles.submitBtn} type="submit">
          Publish
        </button>
      </div>
    </form>
  );
};

export default NewCommentForm;
