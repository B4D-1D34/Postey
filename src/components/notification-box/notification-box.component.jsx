import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUserNotification } from "../../redux/user/user.selectors";
import styles from "./notification-box.module.css";

const NotificationBox = () => {
  const timer = useRef();
  const boxRef = useRef();
  const notification = useSelector(selectUserNotification);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    boxRef.current.classList.add(styles.visible);
    timer.current = setTimeout(() => {
      boxRef.current.classList.remove(styles.visible);
    }, 5000);
  }, [notification]);
  useEffect(() => {
    boxRef.current.addEventListener("mouseenter", () => {
      clearTimeout(timer.current);
    });
    boxRef.current.addEventListener("mouseleave", () => {
      timer.current = setTimeout(() => {
        boxRef.current.classList.remove(styles.visible);
      }, 5000);
    });
  }, []);

  const handleNotificationClose = () =>
    boxRef.current.classList.remove(styles.visible);
  return (
    <div
      className={styles.notificationBox}
      style={{ visibility: `${!notification?.message ? "hidden" : "inherit"}` }}
      ref={boxRef}
    >
      <p className={styles.notification}>
        {notification?.message.includes("Firebase:")
          ? "Error:".concat(
              notification?.message.replace(
                /Firebase: Error \(auth\/\b|\).|-/gm,
                " "
              )
            )
          : notification?.message}
      </p>
      <FontAwesomeIcon
        className={styles.notificationClose}
        icon={faTimes}
        onClick={handleNotificationClose}
      />
    </div>
  );
};

export default NotificationBox;
