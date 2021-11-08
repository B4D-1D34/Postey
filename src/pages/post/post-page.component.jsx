import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import RatingBox from "../../components/rating-box/rating-box.component";
import { getAuthorName } from "../../firebase/firebase.utils";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import { countTime } from "../../timeCountHelper";
import { getPost } from "../homepage/testPostData";
import styles from "./post-page.module.css";

const PostPage = () => {
  const { postId } = useParams();
  const posts = useSelector(selectCurrentPosts);
  const { content, author, closeComments, comments, createdAt, theme } =
    posts[postId];
  // getPost(postId);
  const time = countTime(
    createdAt.nanoseconds
      ? createdAt.seconds * 1000 + createdAt.nanoseconds
      : createdAt.seconds * 1000
  );
  // console.log(currentUser?.rates);

  const authorName = useRef();
  useEffect(() => {
    if (author === "0JA9NqvvKoWFstaSCbBxjDifRxR2") {
      getAuthorName(author).then((name) => {
        authorName.current.innerText = name;
      });
    }
  }, []);

  return (
    <div className={styles.contentblock}>
      <div className={styles.authorAndTime}>
        <h4 className={styles.author} ref={authorName}>
          {author}
        </h4>
        <h5 className={styles.time}>{time}</h5>
      </div>
      <h1 className={styles.theme}>{theme}</h1>
      <p className={styles.content}>{content}</p>
      <RatingBox postId={postId} />
    </div>
  );
};
export default PostPage;
