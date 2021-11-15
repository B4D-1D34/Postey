import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeDbCommentField,
  updatePost,
} from "../../firebase/firebase.utils";
import {
  commentUpdate,
  postUpdateSuccess,
} from "../../redux/posts/posts.actions";
import { updateFailure, updateSuccess } from "../../redux/user/user.actions";
import ResizableInput from "../resizable-input/resizable-input.component";
import styles from "./edit-post-button.module.css";

const EditPostButton = ({
  postId,
  commentId,
  initialContent,
  initialTheme,
}) => {
  const dispatch = useDispatch();
  const confirmDiv = useRef();
  const [post, setPost] = useState({
    theme: initialTheme,
    content: initialContent,
  });
  const { theme, content } = post;
  const [isEditing, setIsEditing] = useState(true);

  const toggleIsEditing = () => setIsEditing(!isEditing);

  const handleClose = ({ target }) => {
    if (!confirmDiv.current.contains(target)) {
      toggleIsEditing();
    }
  };

  const handleChange = ({ target }) => {
    // if (target.type !== "checkbox") {
    const { name, value } = target;
    setPost({ ...post, [name]: value });
    // } else if (target.type === "checkbox") {
    //   const { name, checked } = target;
    //   setPost({ ...post, [name]: checked });
    // }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      dispatch(updateFailure({ message: "You can't post an empty message" }));
      return;
    }
    if (commentId) {
      try {
        changeDbCommentField(postId, commentId, { content });
        dispatch(
          commentUpdate({ data: { postId, commentId, value: { content } } })
        );
        dispatch(updateSuccess({ message: "Updated!" }));
        toggleIsEditing();
      } catch ({ message }) {
        dispatch(updateFailure({ message }));
      }
    } else {
      updatePost(postId, { theme, content })
        .then((doc) => {
          dispatch(postUpdateSuccess(doc));
          dispatch(updateSuccess({ message: "Updated!" }));
          toggleIsEditing();
        })
        .catch(({ message }) => dispatch(updateFailure({ message })));
    }
  };

  return (
    <>
      <div className={styles.statsBtn} onClick={toggleIsEditing}>
        <FontAwesomeIcon icon={faPen} className={styles.icon} />
      </div>
      <div
        hidden={isEditing}
        className={styles.editConfirmationBG}
        onClick={handleClose}
      >
        <form
          ref={confirmDiv}
          className={styles.editConfirmation}
          onSubmit={handleEdit}
        >
          <h2 className={styles.editHeading}>Edit</h2>
          {!commentId ? (
            <input
              className={styles.theme}
              onChange={handleChange}
              autoComplete="off"
              name="theme"
              value={theme}
              placeholder="new post"
            />
          ) : null}
          <ResizableInput
            handleChange={handleChange}
            content={content}
            isEditing={isEditing}
          />

          <button type="submit" className={styles.confirmBtn}>
            Confirm
          </button>
        </form>
      </div>
    </>
  );
};
export default EditPostButton;
