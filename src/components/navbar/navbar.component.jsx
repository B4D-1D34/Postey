import {
  firebaseSignOut,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import styles from "./navbar.module.css";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutSuccess } from "../../redux/user/user.actions";
import { useSelector, useDispatch } from "react-redux";
import SignInForm from "../sign-in-form/sign-in-form.component";
import { useState } from "react";
import SignUpForm from "../sign-up-form/sign-up-form.component";

const Navbar = () => {
  const [isSignUpShown, setIsSignUpShown] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const appSignOut = () => {
    firebaseSignOut();
    dispatch(signOutSuccess());
  };

  return (
    <div className={styles.navbar}>
      <h1 className={styles.sitename}>Postey</h1>
      {isSignUpShown ? (
        <SignUpForm setIsSignUpShown={setIsSignUpShown} />
      ) : null}
      <div className={styles.btnContainer}>
        {currentUser ? (
          <button className={styles.navbarBtn} onClick={appSignOut}>
            Sign Out
          </button>
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
            <button className={styles.navbarBtn} onClick={signInWithGoogle}>
              Sign In With Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;