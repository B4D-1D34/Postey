import { useEffect } from "react";
import { useSelector } from "react-redux";
import { changeDbUserField } from "../../firebase/firebase.utils";
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
    .filter(({ props: { type, id, author, refPostId } }) => {
      if (type === "postRate") {
        return posts[id] && currentUser.notifications[`${id}${author}`];
      } else if (type === "commentRate") {
        return (
          posts[refPostId]?.comments[id] &&
          currentUser.notifications[`${id}${author}`]
        );
      } else {
        return posts[refPostId]?.comments[id];
      }
    })
    .map((notification) => notification);

  //deleting inexistent notifications from db
  useEffect(() => {
    let newNotifications = {};
    filteredNotifications.slice(0, 15).forEach(
      ({ key }) =>
        (newNotifications = {
          ...newNotifications,
          [key.replace("_notif", "")]: {
            ...currentUser.notifications[key.replace("_notif", "")],
          },
        })
    );
    // console.log("clearing");
    // console.log(newNotifications);
    changeDbUserField(
      currentUser.id,
      { notifications: newNotifications },
      "add"
    );
    //eslint-disable-next-line
  }, [currentUser.id]);
  //deleting inexistent notifications from db

  useEffect(
    () =>
      setNotificationsCount(
        filteredNotifications.filter(({ props }) => props.unseen).length
      ),
    [filteredNotifications, setNotificationsCount]
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
