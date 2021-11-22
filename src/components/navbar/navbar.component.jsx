import {
  firebaseSignOut,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import styles from "./navbar.module.css";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutSuccess, updateFailure } from "../../redux/user/user.actions";
import { useSelector, useDispatch } from "react-redux";
import SignInForm from "../sign-in-form/sign-in-form.component";
import { useState } from "react";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import CustomLink from "../custom-link/custom-link.component";

const Navbar = () => {
  const [isSignUpShown, setIsSignUpShown] = useState(false);

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
