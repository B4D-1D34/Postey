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
  const [isProcessing, setIsProcessing] = useState(false);
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    setIsProcessing(true);
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPass(email, password);
      localStorage.setItem("currentUser", JSON.stringify(user.user.uid));
      setIsProcessing(false);
    } catch (err) {
      dispatch(
        signInFailure({
          message: err.message,
          signInErr: true,
          signUpErr: false,
        })
      );
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit}>
      <h2 className={styles.signInTitle}>Sign In</h2>
      {error?.signInErr ? (
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
      <button
        disabled={isProcessing}
        className={styles.signInSubmit}
        type="submit"
      >
        Sign In
      </button>
      <p className={styles.toSignUp} onClick={() => setIsSignUpShown(true)}>
        Don't have an account?
      </p>
    </form>
  );
};

export default SignInForm;
