import styles from "./post-not-found.module.css";
import image from "./branch_Broken.png";

const PostNotFound = () => {
  return (
    <div className={styles.notFound}>
      <img className={styles.image} src={image} alt="page not found" />
      <h1>Sorry, the page you're looking for doesn't exist</h1>
    </div>
  );
};
export default PostNotFound;
