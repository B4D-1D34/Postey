import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.wave}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default Loader;
