import { useParams } from "react-router";

import RatingBox from "../../components/rating-box/rating-box.component";
import { countTime } from "../../timeCountHelper";
import { getPost } from "../homepage/testPostData";
import styles from "./post-page.module.css";

const PostPage = () => {
  const { postId } = useParams();

  const { content, author, closeComments, comments, createdAt, theme } =
    getPost(postId);
  const time = countTime(createdAt);
  // console.log(currentUser?.rates);

  return (
    <div className={styles.contentblock}>
      <div className={styles.authorAndTime}>
        <h4 className={styles.author}>{author}</h4>
        <h5 className={styles.time}>{time}</h5>
      </div>
      <h1 className={styles.theme}>{theme}</h1>
      <p>{content}</p>
      <RatingBox postId={postId} />
    </div>
  );
};
export default PostPage;
