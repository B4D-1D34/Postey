import { useSelector } from "react-redux";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import NotificationItem from "../notification-item/notification-item.component";
import styles from "./action-notification-box.module.css";

const ActionNotificationBox = ({ setNotificationsCount }) => {
  const currentUser = useSelector(selectCurrentUser);
  const posts = useSelector(selectCurrentPosts);

  const commentRates = Object.keys(currentUser.notifications)
    .filter(
      (id) =>
        currentUser.notifications[id].currentRate &&
        currentUser.notifications[id].refPostId
    )
    .map((id) => ({ id, ...currentUser.notifications[id] }));
  const postRates = Object.keys(currentUser.notifications)
    .filter(
      (id) =>
        currentUser.notifications[id].currentRate &&
        !currentUser.notifications[id].refPostId
    )
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
  const allNotifications = comments
    .map(({ id, createdAt, refPostId, unseen }) => (
      <NotificationItem
        unseen={unseen}
        author={posts[refPostId]?.comments[id]?.author}
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
    ))
    .concat(
      replies.map(({ id, createdAt, refPostId, unseen }) => (
        <NotificationItem
          unseen={unseen}
          author={posts[refPostId]?.comments[id]?.author}
          type="reply"
          key={`${id}_notif`}
          id={id}
          createdAt={
            createdAt?.nanoseconds
              ? createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
              : createdAt?.seconds * 1000
          }
          refPostId={refPostId}
        />
      )),
      commentRates.map(
        ({ id, createdAt, refPostId, currentRate, sender, unseen }) => (
          <NotificationItem
            unseen={unseen}
            author={sender}
            type="commentRate"
            key={`${id}_notif`}
            id={id.replace(`${sender}`, "")}
            createdAt={
              createdAt?.nanoseconds
                ? createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
                : createdAt?.seconds * 1000
            }
            currentRate={currentRate}
            refPostId={refPostId}
          />
        )
      ),
      postRates.map(({ id, createdAt, currentRate, sender, unseen }) => (
        <NotificationItem
          unseen={unseen}
          author={sender}
          type="postRate"
          key={`${id}_notif`}
          id={id.replace(`${sender}`, "")}
          createdAt={
            createdAt?.nanoseconds
              ? createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
              : createdAt?.seconds * 1000
          }
          currentRate={currentRate}
        />
      ))
    );
  const filteredNotifications = allNotifications
    .sort((a, b) => b.props.createdAt - a.props.createdAt)
    .filter(({ props }) => {
      if (props.type === "postRate") {
        return posts[props.id];
      } else {
        return posts[props.refPostId]?.comments[props.id];
      }
    })
    .map((notification) => notification);
  setNotificationsCount(
    filteredNotifications.filter(({ props }) => props.unseen).length
  );
  return (
    <div className={styles.actionNotificationBox}>
      {filteredNotifications.length ? (
        filteredNotifications
      ) : (
        <div className={styles.noNotif}>
          <h3>You have no new notifications yet</h3>
        </div>
      )}
    </div>
  );
};

export default ActionNotificationBox;
