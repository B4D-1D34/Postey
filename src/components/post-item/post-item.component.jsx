import { faCommentAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthorName } from "../../firebase/firebase.utils";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { countTime } from "../../timeCountHelper";
import DeletePostButton from "../delete-post-button/delete-post-button.component";
import styles from "./post-item.module.css";

const PostItem = ({
  id,
  theme,
  author,
  rating,
  createdAt,
  content,
  commentsLength,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const authorName = useRef();
  const contentBlock = useRef();

  useEffect(() => {
    getAuthorName(author).then((name) => {
      if (authorName.current) {
        authorName.current.innerText = name;
      }
    });
    if (contentBlock.current) {
      contentBlock.current.innerHTML = content.replaceAll("\n", "<br />");
    }
  }, [author, content]);

  return (
    <div className={styles.postItem}>
      <Link to={`post/${id}`}>
        <div className={styles.description}>
          <div className={styles.authorAndTime}>
            <h4 className={styles.author} ref={authorName}>
              user
            </h4>
            <h5 className={styles.time}>{countTime(createdAt)}</h5>
          </div>
          <h1 className={styles.theme}>{theme}</h1>
          <p ref={contentBlock} className={styles.content}>
            {content}
          </p>
        </div>
      </Link>
      <div className={styles.stats}>
        <div className={styles.statsBtn}>
          <FontAwesomeIcon icon={faCommentAlt} className={styles.icon} />
          {commentsLength}
        </div>
        <div className={styles.statsBtn}>
          <FontAwesomeIcon icon={faStar} className={styles.icon} />
          {rating}
        </div>
        {currentUser?.id === author ? <DeletePostButton id={id} /> : null}
      </div>
    </div>
  );
};

export default PostItem;
