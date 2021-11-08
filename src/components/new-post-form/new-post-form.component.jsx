import { useSelector } from "react-redux";
import styles from "./new-post-form.module.css";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import ResizableInput from "../resizable-input/resizable-input.component";
import { useState } from "react";

const NewPostForm = () => {
  const [post, setPost] = useState({
    theme: "",
    content: "",
    closeComments: false,
  });
  const currentUser = useSelector(selectCurrentUser);
  const { theme, closeComments } = post;

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
  };
  return (
    <form className={styles.newPostForm} onSubmit={handleSubmit}>
      <div className={styles.authorAndTheme}>
        <h4 className={styles.author}>{currentUser?.displayName}</h4>
        <input
          className={styles.theme}
          onChange={handleChange}
          name="theme"
          value={theme}
          placeholder="new post"
        />
      </div>
      <div className={styles.visibleWithFocus}>
        <ResizableInput handleChange={handleChange} />
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
