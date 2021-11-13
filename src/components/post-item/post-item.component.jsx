import {
  faCommentAlt,
  faMinus,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthorName } from "../../firebase/firebase.utils";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { countTime } from "../../timeCountHelper";
import DeletePostButton from "../delete-post-button/delete-post-button.component";
import styles from "./post-item.module.css";
import CustomLink from "../custom-link/custom-link.component";

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
  const contentWrapper = useRef();
  const [isEnoughSpace, setIsEnoughSpace] = useState();
  const [isExposed, setIsExposed] = useState(false);

  useEffect(() => {
    getAuthorName(author).then((name) => {
      if (authorName.current) {
        authorName.current.innerText = name;
      }
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
  return (
    <div className={styles.postItem}>
      <div className={styles.description}>
        <CustomLink url={`post/${id}`}>
          <div className={styles.authorAndTime}>
            <h4 className={styles.author} ref={authorName}>
              user
            </h4>
            <h5 className={styles.time}>{countTime(createdAt)}</h5>
          </div>
          <h1 className={styles.theme}>{theme}</h1>
        </CustomLink>
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
      </div>
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
