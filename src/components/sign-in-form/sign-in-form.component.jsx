import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPass } from "../../firebase/firebase.utils";
import { signInFailure } from "../../redux/user/user.actions";
import { selectError } from "../../redux/user/user.selectors";
import styles from "./sign-in-form.module.css";

const SignInForm = ({ setIsSignUpShown }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPass(email, password);
    } catch (err) {
      dispatch(signInFailure(err));
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit}>
      <h2 className={styles.signInTitle}>Sign In</h2>
      {error ? (
        <p className={styles.signInErr}>
          {error.message.replace(/Firebase: Error \(auth\/\b|\).|-/gm, " ")}
        </p>
      ) : null}
      <div className={styles.inputContainer}>
        <label htmlFor="email" alt="email">
          @:
        </label>
        <input
          className={styles.formInput}
          id="email"
          name="email"
          value={email}
          type="email"
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password" alt="password">
          !#$%^:
        </label>
        <input
          className={styles.formInput}
          id="password"
          name="password"
          value={password}
          type="password"
          onChange={handleChange}
          required
        />
      </div>
      <button className={styles.signInSubmit} type="submit">
        Sign In
      </button>
      <p className={styles.toSignUp} onClick={() => setIsSignUpShown(true)}>
        Don't have an account?
      </p>
    </form>
  );
};

export default SignInForm;
