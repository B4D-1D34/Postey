import {
  changeDbUserField,
  firebaseSignOut,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import styles from "./navbar.module.css";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutSuccess, updateFailure } from "../../redux/user/user.actions";
import { useSelector, useDispatch } from "react-redux";
import SignInForm from "../sign-in-form/sign-in-form.component";
import { useEffect, useRef, useState } from "react";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import CustomLink from "../custom-link/custom-link.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ActionNotificationBox from "../action-notification-box/action-notification-box.component";
import { useLocation } from "react-router";

const Navbar = () => {
  const [isSignUpShown, setIsSignUpShown] = useState(false);
  const [isNotificationsHidden, setIsNotificationsHidden] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const location = useLocation();
  const notificationsBox = useRef();

  useEffect(() => {
    setIsNotificationsHidden(true);
  }, [location]);

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const appSignOut = () => {
    firebaseSignOut();
    dispatch(signOutSuccess());
    localStorage.setItem("currentUser", JSON.stringify(null));
  };

  const appSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      localStorage.setItem("currentUser", JSON.stringify(user.user.uid));
    } catch ({ message }) {
      dispatch(updateFailure({ message: "Sign in failed, try again" }));
    }
  };

  const notificationsSeen = () => {
    if (notificationsCount) {
      Object.keys(currentUser.notifications).forEach(
        async (key) =>
          await changeDbUserField(
            currentUser.id,
            {
              notifications: {
                ...currentUser.notifications[key],
                unseen: false,
              },
              id: key,
            },
            true
          )
      );
      //update redux state//////////////////////
    }
  };

  const clickOutClose = ({ target }) => {
    if (!notificationsBox.current?.contains(target)) {
      setIsNotificationsHidden(true);
      document.removeEventListener("click", clickOutClose);
      notificationsSeen();
    }
  };

  const toggleNotifications = () => {
    if (isNotificationsHidden) {
      document.addEventListener("click", clickOutClose);
      setIsNotificationsHidden(false);
    } else {
      document.removeEventListener("click", clickOutClose);
      setIsNotificationsHidden(true);
      notificationsSeen();
    }
  };
  return (
    <div className={styles.navbar}>
      <CustomLink url="/">
        <h1 className={styles.sitename}>Postey</h1>
      </CustomLink>
      {isSignUpShown ? (
        <SignUpForm setIsSignUpShown={setIsSignUpShown} />
      ) : null}
      <div className={styles.btnContainer}>
        {JSON.parse(localStorage.getItem("currentUser")) ? (
          <>
            {currentUser ? (
              <div ref={notificationsBox}>
                <button
                  className={`${styles.navbarBtn} ${styles.icon}`}
                  onClick={toggleNotifications}
                >
                  <FontAwesomeIcon icon={faBell} />
                  {notificationsCount ? (
                    <div className={styles.notificationsCount}>
                      {notificationsCount}
                    </div>
                  ) : null}
                </button>
                <div className={styles.noBorder} hidden={isNotificationsHidden}>
                  <ActionNotificationBox
                    setNotificationsCount={setNotificationsCount}
                  />
                </div>
              </div>
            ) : null}
            <CustomLink url="/profile">
              <button className={styles.navbarBtn}>Profile</button>
            </CustomLink>
            <button
              className={styles.navbarBtn}
              disabled={!currentUser}
              onClick={appSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <>
              <button className={`${styles.navbarBtn} ${styles.signInBtn}`}>
                Sign In / Sign Up
              </button>
              <div className={styles.signUpAndInForm}>
                <SignInForm setIsSignUpShown={setIsSignUpShown} />
              </div>
            </>
            <button className={styles.navbarBtn} onClick={appSignInWithGoogle}>
              Sign In With Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
