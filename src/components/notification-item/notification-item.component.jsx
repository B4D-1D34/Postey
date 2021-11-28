import styles from "./notification-item.module.css";
import { countTime } from "../../timeCountHelper";
import { useState } from "react";
import {
  changeDbUserField,
  getAuthorName,
} from "../../firebase/firebase.utils";
import CustomLink from "../custom-link/custom-link.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { useDispatch } from "react-redux";
import { currentUserUpdate } from "../../redux/user/user.actions";

const NotificationItem = ({
  author,
  type,
  id,
  createdAt,
  refPostId,
  refCommentId,
  currentRate,
  unseen,
}) => {
  const [sender, setSender] = useState("user");
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  getAuthorName(author).then((name) => setSender(name));
  const time = countTime(createdAt);

  const deleteNotification = (e) => {
    e.stopPropagation();
    const notificationsModified = Object.keys(currentUser.notifications)
      .filter((key) => {
        if (type === "commentRate" || type === "postRate") {
          return key !== `${id}${author}`;
        } else {
          return key !== id;
        }
      })
      .reduce(
        (acc, key) => (acc = { ...acc, [key]: currentUser.notifications[key] }),
        {}
      );
    changeDbUserField(currentUser.id, {
      notifications: { ...notificationsModified },
    });
    dispatch(
      currentUserUpdate({
        ...currentUser,
        notifications: { ...notificationsModified },
      })
    );
  };

  return (
    <div className={styles.notificationItem}>
      <div className={styles.unseenIcon} hidden={!unseen} />
      <div className={styles.notifData}>
        <h4 className={styles.author}>{sender}</h4>
        <div className={styles.content}>
          {type === "comment" ? (
            <>
              <p>commented your</p>
              <CustomLink url={`/post/${refPostId}/#${id}`}>
                <p className={styles.link}>post</p>
              </CustomLink>
            </>
          ) : type === "reply" ? (
            <>
              <p>replied to your</p>
              <CustomLink url={`/post/${refPostId}/#${id}`}>
                <p className={styles.link}>comment</p>
              </CustomLink>
            </>
          ) : type === "commentRate" ? (
            <>
              <p>{currentRate === "true" ? "upvoted" : "downvoted"} your</p>
              <CustomLink url={`/post/${refPostId}/#${id}`}>
                <p className={styles.link}>comment</p>
              </CustomLink>
            </>
          ) : type === "postRate" ? (
            <>
              <p>{currentRate === "true" ? "upvoted" : "downvoted"} your</p>
              <CustomLink url={`/post/${id}`}>
                <p className={styles.link}>post</p>
              </CustomLink>
            </>
          ) : null}
        </div>
        <h5 className={styles.time}>{time}</h5>
      </div>
      <div className={styles.deleteBtn} onClick={deleteNotification}>
        <FontAwesomeIcon icon={faTimes} className={styles.icon} />
      </div>
    </div>
  );
};
export default NotificationItem;
