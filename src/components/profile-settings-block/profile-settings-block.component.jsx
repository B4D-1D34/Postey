import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserAuth,
} from "../../redux/user/user.selectors";
import {
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "@firebase/auth";

import styles from "./profile-settings-block.module.css";
import { changeDbUserField } from "../../firebase/firebase.utils";
import { useDispatch } from "react-redux";
import {
  updateFailure,
  updateSuccess,
  currentUserUpdate,
} from "../../redux/user/user.actions";

const ProfileSettingsBlock = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const userAuth = useSelector(selectUserAuth);
  const [userCredentials, setCredentials] = useState({
    displayName: currentUser.displayName,
    email: userAuth.email,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { displayName, email, oldPassword, newPassword, confirmPassword } =
    userCredentials;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleDisplayNameUpdate = (e) => {
    e.preventDefault();
    try {
      changeDbUserField(userAuth, { displayName });
      dispatch(currentUserUpdate({ ...currentUser, displayName }));
      dispatch(
        updateSuccess({ message: `Your display name has been updated!` })
      );
    } catch ({ message }) {
      dispatch(updateFailure({ message }));
    }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(userAuth, email);
      setCredentials({ ...userCredentials, email: userAuth.email });
      dispatch(updateSuccess({ message: `Your email has been updated!` }));
    } catch ({ message }) {
      dispatch(updateFailure({ message }));
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      dispatch(updateFailure({ message: `Error: passwords don't match` }));
      return;
    }

    const credential = EmailAuthProvider.credential(
      userAuth.email,
      oldPassword
    );
    reauthenticateWithCredential(userAuth, credential)
      .then(() => {
        updatePassword(userAuth, newPassword);
        setCredentials({
          ...userCredentials,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        dispatch(updateSuccess({ message: `Your password has been updated!` }));
      })
      .catch(({ message }) => dispatch(updateFailure({ message })));
  };
  return (
    <div className={styles.settingsblock}>
      <h1>Account Settings</h1>
      <form
        className={styles.inputContainer}
        onSubmit={handleDisplayNameUpdate}
      >
        <p>Display Name:</p>
        <input
          className={styles.formInput}
          value={displayName}
          name="displayName"
          onChange={handleChange}
          required
        />
        <button
          className={styles.saveSubmit}
          disabled={displayName === currentUser.displayName}
          type="submit"
        >
          Save
        </button>
      </form>
      {currentUser.authMethod !== "google" ? (
        <>
          <form className={styles.inputContainer} onSubmit={handleEmailUpdate}>
            <p>Email:</p>
            <input
              className={styles.formInput}
              value={email}
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
            <button
              className={styles.saveSubmit}
              disabled={email === userAuth.email}
              type="submit"
            >
              Save
            </button>
          </form>
          <form onSubmit={handlePasswordUpdate}>
            <div className={styles.inputContainer}>
              <p>Password:</p>

              <div className={styles.innerEditingBlock}>
                <div className={styles.inputContainer}>
                  <p>Old:</p>
                  <input
                    className={styles.formInput}
                    value={oldPassword}
                    type="password"
                    name="oldPassword"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <p>New:</p>
                  <input
                    className={styles.formInput}
                    value={newPassword}
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <p>Confirm:</p>
                  <input
                    className={styles.formInput}
                    value={confirmPassword}
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  className={styles.saveSubmit}
                  disabled={!oldPassword || !newPassword || !confirmPassword}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </>
      ) : null}
    </div>
  );
};
export default ProfileSettingsBlock;
