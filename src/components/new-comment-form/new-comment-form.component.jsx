import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  changeDbUserField,
  createNewComment,
  getAuthorName,
} from "../../firebase/firebase.utils";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const posts = useSelector(selectCurrentPosts);
  const receiverName = useRef();

  const handleChange = ({ target }) => {
    const { value } = target;
    setContent(value);
  };

  const handleSubmit = (e) => {
    setIsProcessing(true);
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
        //notify post author if it's not current user
        if (currentUser.id !== posts[postId].author) {
          changeDbUserField(
            posts[postId].author,
            {
              notifications: {
                refPostId: postId,
                createdAt: new Date(),
                unseen: true,
              },
              id: comment.id,
            },
            "partly"
          );
        }
        //notify comment author if reply exists and it's not current user
        if (comment.data?.replyReference) {
          const replyReceiver = posts[postId]?.comments[replyReference]?.author;
          if (currentUser.id !== replyReceiver) {
            changeDbUserField(
              replyReceiver,
              {
                notifications: {
                  refPostId: postId,
                  refCommentId: replyReference,
                  createdAt: new Date(),
                  unseen: true,
                },
                id: comment.id,
              },
              "partly"
            );
          }
        }
        //redux state update
        dispatch(
          commentUpdate({ data: { postId, commentId: comment.id, comment } })
        );

        setReplyReference("");
        setContent("");
        setIsProcessing(false);
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
            <h5 className={styles.replyReceiver} ref={receiverName}>
              receiver
            </h5>
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
        <button
          className={styles.submitBtn}
          disabled={isProcessing}
          type="submit"
        >
          Publish
        </button>
      </div>
    </form>
  );
};

export default NewCommentForm;
