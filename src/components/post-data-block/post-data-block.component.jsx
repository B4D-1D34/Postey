import { useEffect, useRef } from "react";

import { countTime } from "../../timeCountHelper";
import { getAuthorName } from "../../firebase/firebase.utils";

import styles from "./post-data-block.module.css";
import DeletePostButton from "../delete-post-button/delete-post-button.component";

const PostDataBlock = ({
  theme,
  content,
  createdAt,
  author,
  closeComments,
  comments,
  id,
  owner,
}) => {
  const authorName = useRef();

  const time = countTime(
    createdAt?.nanoseconds
      ? createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
      : createdAt?.seconds * 1000
  );

  useEffect(() => {
    getAuthorName(author).then((name) => {
      authorName.current.innerText = name;
    });
  }, [author]);

  return (
    <>
      <div className={styles.postsHead}>
        <div className={styles.authorAndTime}>
          <h4 className={styles.author} ref={authorName}>
            user
          </h4>
          <h5 className={styles.time}>{time}</h5>
        </div>
        {owner ? <DeletePostButton id={id} /> : null}
      </div>
      <h1 className={styles.theme}>{theme}</h1>
      <p className={styles.content}>{content}</p>
    </>
  );
};

export default PostDataBlock;
