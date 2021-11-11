import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { postDelete } from "../../redux/posts/posts.actions";
import { updateFailure, updateSuccess } from "../../redux/user/user.actions";
import { deletePost } from "../../firebase/firebase.utils";

import styles from "./delete-post-button.module.css";
import { useHistory } from "react-router";

const DeletePostButton = ({ id }) => {
  const history = useHistory();
  const [isConfirmation, setIsConfirmation] = useState(true);
  const confirmDiv = useRef();
  const dispatch = useDispatch();

  const handleClose = ({ target }) => {
    if (!confirmDiv.current.contains(target)) {
      toggleConfirmation();
    }
  };

  const toggleConfirmation = () => setIsConfirmation(!isConfirmation);

  const handleDelete = () => {
    if (history.location.pathname !== "/") {
      history.push("/");
    }
    deletePost(id)
      .then(() => {
        dispatch(postDelete(id));
        dispatch(updateSuccess({ message: "Deleted!" }));
      })
      .catch(({ message }) => dispatch(updateFailure({ message })));
  };
  return (
    <>
      <div className={styles.statsBtn} onClick={toggleConfirmation}>
        <FontAwesomeIcon icon={faTimes} className={styles.icon} />
      </div>
      <div
        hidden={isConfirmation}
        className={styles.deleteConfirmationBG}
        onClick={handleClose}
      >
        <div ref={confirmDiv} className={styles.deleteConfirmation}>
          Are you sure? You won't be able to restore this post later.
          <button onClick={handleDelete} className={styles.confirmBtn}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};
export default DeletePostButton;
