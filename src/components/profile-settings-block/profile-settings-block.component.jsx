import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import styles from "./profile-settings-block.module.css";

const ProfileSettingsBlock = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [userCredentials, setCredentials] = useState({
    displayName: currentUser.displayName,
    email: currentUser.email,
    password: "",
  });
  const { displayName, email, password } = userCredentials;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div className={styles.settingsblock}>
      <h1>Account Settings</h1>
      <form className={styles.inputContainer}>
        <p>Display Name:</p>
        <input
          className={styles.formInput}
          value={displayName}
          name="displayName"
          onChange={handleChange}
        />
        <button className={styles.saveSubmit} type="submit">
          Save
        </button>
      </form>
      <form className={styles.inputContainer}>
        <p>Email:</p>
        <input
          className={styles.formInput}
          value={email}
          name="email"
          onChange={handleChange}
        />
        <button className={styles.saveSubmit} type="submit">
          Save
        </button>
      </form>
      <form className={styles.inputContainer}>
        <p>Password:</p>
        <p>Old:</p>
        <input
          className={styles.formInput}
          value={password}
          type="password"
          name="password"
          onChange={handleChange}
        />
        <button className={styles.saveSubmit} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
export default ProfileSettingsBlock;
