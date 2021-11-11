import { useSelector } from "react-redux";
import styles from "./new-post-form.module.css";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import ResizableInput from "../resizable-input/resizable-input.component";
import { useState } from "react";
import { createNewPost } from "../../firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { postUpdateSuccess } from "../../redux/posts/posts.actions";
import { updateFailure, updateSuccess } from "../../redux/user/user.actions";

const NewPostForm = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    theme: "",
    content: "",
    closeComments: false,
  });
  const currentUser = useSelector(selectCurrentUser);
  const { theme, content, closeComments } = post;

  const handleChange = ({ target }) => {
    if (target.type !== "checkbox") {
      const { name, value } = target;
      setPost({ ...post, [name]: value });
    } else if (target.type === "checkbox") {
      const { name, checked } = target;
      setPost({ ...post, [name]: checked });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      dispatch(updateFailure({ message: "You can't post an empty message" }));
      return;
    }
    createNewPost({
      theme,
      content,
      closeComments,
      author: currentUser.id,
    })
      .then((doc) => {
        dispatch(postUpdateSuccess(doc));
        dispatch(
          updateSuccess({
            message: "Successfully posted! You can edit post within 15 minutes",
          })
        );
        setPost({ theme: "", content: "", closeComments: false });
      })
      .catch(({ message }) => dispatch(updateFailure({ message })));
  };
  return (
    <form className={styles.newPostForm} onSubmit={handleSubmit}>
      <div className={styles.authorAndTheme}>
        <h4 className={styles.author}>{currentUser?.displayName}</h4>
        <input
          className={styles.theme}
          onChange={handleChange}
          autoComplete="off"
          name="theme"
          value={theme}
          placeholder="new post"
        />
      </div>
      <div className={styles.visibleWithFocus}>
        <ResizableInput handleChange={handleChange} content={content} />
        <div className={styles.submitGroup}>
          <button className={styles.submitBtn} type="submit">
            Publish
          </button>
          <p>Close comments?</p>
          <input
            className={styles.closeComments}
            type="checkbox"
            id="closeComments"
            name="closeComments"
            onChange={handleChange}
            checked={closeComments}
          />
          <label htmlFor="closeComments" className={styles.styledCheckbox} />
        </div>
      </div>
    </form>
  );
};

export default NewPostForm;
