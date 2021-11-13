import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeDbPostField } from "../../firebase/firebase.utils";
import { postUpdateSuccess } from "../../redux/posts/posts.actions";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import { updateFailure } from "../../redux/user/user.actions";
import styles from "./close-comments-button.module.css";

const CloseCommentsButton = ({ closeComments, id }) => {
  const posts = useSelector(selectCurrentPosts);
  const dispatch = useDispatch();

  const handleCloseComments = () => {
    try {
      changeDbPostField(id, { closeComments: !closeComments });
      dispatch(
        postUpdateSuccess({
          id,
          data: { ...posts[id], closeComments: !closeComments },
        })
      );
    } catch ({ message }) {
      dispatch(updateFailure({ message }));
    }
  };
  return (
    <div className={styles.btnWrapper}>
      <div className={styles.statsBtn} onClick={handleCloseComments}>
        <FontAwesomeIcon
          className={styles.icon}
          style={{ color: `${closeComments ? "rgb(201, 0, 0)" : ""}` }}
          icon={faBan}
        />
      </div>
      <div className={styles.hint}>Close Comments</div>
    </div>
  );
};

export default CloseCommentsButton;
