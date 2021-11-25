import styles from "./notification-item.module.css";
import { countTime } from "../../timeCountHelper";
import { useState } from "react";
import { getAuthorName } from "../../firebase/firebase.utils";
import CustomLink from "../custom-link/custom-link.component";

const NotificationItem = ({
  author,
  type,
  id,
  createdAt,
  refPostId,
  refCommentId,
  currentRate,
}) => {
  const [sender, setSender] = useState("user");

  getAuthorName(author).then((name) => setSender(name));
  const time = countTime(createdAt);
  return (
    <div className={styles.notificationItem}>
      {type === "comment" ? (
        <>
          <h4 className={styles.author}>{sender}</h4>
          <div className={styles.content}>
            <p>commented your</p>
            <CustomLink url={`/post/${refPostId}/#${id}`}>
              <p className={styles.link}>post</p>
            </CustomLink>
          </div>
          <h5 className={styles.time}>{time}</h5>
        </>
      ) : type === "reply" ? (
        <>
          <h4 className={styles.author}>{sender}</h4>
          <div className={styles.content}>
            <p>replied to your</p>
            <CustomLink url={`/post/${refPostId}/#${id}`}>
              <p className={styles.link}>comment</p>
            </CustomLink>
          </div>
          <h5 className={styles.time}>{time}</h5>
        </>
      ) : type === "commentRate" ? (
        <>
          <h4 className={styles.author}>{sender}</h4>
          <div className={styles.content}>
            <p>{currentRate === "true" ? "upvoted" : "downvoted"} your</p>
            <CustomLink url={`/post/${refPostId}/#${id}`}>
              <p className={styles.link}>comment</p>
            </CustomLink>
          </div>
          <h5 className={styles.time}>{time}</h5>
        </>
      ) : type === "postRate" ? (
        <>
          <h4 className={styles.author}>{sender}</h4>
          <div className={styles.content}>
            <p>{currentRate === "true" ? "upvoted" : "downvoted"} your</p>
            <CustomLink url={`/post/${id}`}>
              <p className={styles.link}>post</p>
            </CustomLink>
          </div>
          <h5 className={styles.time}>{time}</h5>
        </>
      ) : null}
    </div>
  );
};
export default NotificationItem;
