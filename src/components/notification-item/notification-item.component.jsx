import styles from "./notification-item.module.css";
import { countTime } from "../../timeCountHelper";
import { useEffect } from "react";
import { getAuthorName } from "../../firebase/firebase.utils";

const NotificationItem = ({
  author,
  type,
  id,
  createdAt,
  refPostId,
  refCommentId,
  currentRate,
}) => {
  const sender = getAuthorName(author);
  const time = countTime(createdAt);
  return (
    <div className={styles.notificationItem}>
      {type === "comment" ? (
        <>
          <h4 className={styles.author}>{sender}</h4>
          <h5 className={styles.time}>{time}</h5>
        </>
      ) : null}
    </div>
  );
};
export default NotificationItem;
