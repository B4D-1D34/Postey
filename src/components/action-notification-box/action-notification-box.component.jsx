import { useSelector } from "react-redux";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import NotificationItem from "../notification-item/notification-item.component";
import styles from "./action-notification-box.module.css";

const ActionNotificationBox = () => {
  const currentUser = useSelector(selectCurrentUser);
  const posts = useSelector(selectCurrentPosts);

  const rates = Object.keys(currentUser.notifications)
    .filter((id) => currentUser.notifications[id].currentRate)
    .map((id) => ({ id, ...currentUser.notifications[id] }));
  const comments = Object.keys(currentUser.notifications)
    .filter(
      (id) =>
        !currentUser.notifications[id].currentRate &&
        !currentUser.notifications[id].refCommentId
    )
    .map((id) => ({ id, ...currentUser.notifications[id] }));
  const replies = Object.keys(currentUser.notifications)
    .filter(
      (id) =>
        !currentUser.notifications[id].currentRate &&
        currentUser.notifications[id].refCommentId
    )
    .map((id) => ({ id, ...currentUser.notifications[id] }));
  //   console.log(posts[refPostId].comments[id]);

  return (
    <div className={styles.actionNotificationBox}>
      <>
        {comments.map(({ id, createdAt, refPostId }) => {
          //   console.log(posts[refPostId]);

          return (
            <NotificationItem
              // author={posts[refPostId].comments[id]}
              type="comment"
              key={`${id}_notif`}
              id={id}
              createdAt={
                createdAt?.nanoseconds
                  ? createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
                  : createdAt?.seconds * 1000
              }
              refPostId={refPostId}
            />
          );
        })}
      </>
    </div>
  );
};

export default ActionNotificationBox;
