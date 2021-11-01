import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createUserProfileDocument,
  createUserWithEmailAndPass,
} from "../../firebase/firebase.utils";
import { signInFailure } from "../../redux/user/user.actions";
import { selectError } from "../../redux/user/user.selectors";
import styles from "./sign-up-form.module.css";

const SignUpForm = ({ setIsSignUpShown }) => {
  const formRef = useRef();
  const formBG = useRef();
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    formBG.current.addEventListener("click", (e) => {
      if (!formRef.current.contains(e.target)) {
        setIsSignUpShown(false);
      }
    });
  }, [setIsSignUpShown]);

  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { displayName, email, password, passwordConfirmation } =
    userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      dispatch(signInFailure({ message: "passwords don't match" }));
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPass(email, password);
      await createUserProfileDocument(user, { displayName });
      setIsSignUpShown(false);
    } catch (err) {
      dispatch(signInFailure(err));
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div ref={formBG} className={styles.signUpFormBG}>
      <FontAwesomeIcon
        onClick={() => setIsSignUpShown(false)}
        className={styles.closeSignUp}
        icon={faTimes}
      />
      <form ref={formRef} className={styles.signUpForm} onSubmit={handleSubmit}>
        <h1 className={styles.signUpTitle}>Sign Up </h1>
        {error ? (
          <p className={styles.signUpErr}>
            {error.message.replace(/Firebase: |Error|auth\/\b|\.|-/gm, " ")}
          </p>
        ) : null}
        <div className={styles.inputContainer}>
          <label htmlFor="displayName" alt="displayName">
            Display Name:
          </label>
          <input
            className={styles.formInput}
            id="displayName"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className={styles.inputContainer}>
          <label htmlFor="passwordConfirmation" alt="passwordConfirmation">
            pass confirm:
          </label>
          <input
            className={styles.formInput}
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.signUpSubmit} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUpForm;
