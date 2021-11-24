import { useEffect, useRef } from "react";

import { countTime } from "../../timeCountHelper";
import { getAuthorName } from "../../firebase/firebase.utils";

import styles from "./post-data-block.module.css";
import DeletePostButton from "../delete-post-button/delete-post-button.component";
import EditPostButton from "../edit-post-button/edit-post-button.component";
import CloseCommentsButton from "../close-comments-button/close-comments-button.component";

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
  const contentBlock = useRef();

  const time = createdAt?.nanoseconds
    ? createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
    : createdAt?.seconds * 1000;

  const countedTime = countTime(time);

  const isEditTimePassed = Math.floor((Date.now() - time) / 1000 / 60) > 15;

  useEffect(() => {
    if (author) {
      getAuthorName(author).then((name) => {
        authorName.current.innerText = name;
      });
    }
    if (contentBlock.current) {
      contentBlock.current.innerHTML = content.replaceAll("\n", "<br />");
    }
  }, [author, content]);

  return (
    <>
      <div className={styles.postsHead}>
        <div className={styles.authorAndTime}>
          <h4 className={styles.author} ref={authorName}>
            user
          </h4>
          <h5 className={styles.time}>{countedTime}</h5>
        </div>
        {owner ? (
          <div className={styles.manageBtns}>
            {!isEditTimePassed ? (
              <EditPostButton
                postId={id}
                initialContent={content}
                initialTheme={theme}
              />
            ) : null}
            <CloseCommentsButton closeComments={closeComments} id={id} />
            <DeletePostButton postId={id} />{" "}
          </div>
        ) : null}
      </div>
      <h1 className={styles.theme}>{theme}</h1>
      <p className={styles.content} ref={contentBlock}>
        {content}
      </p>
    </>
  );
};

export default PostDataBlock;
