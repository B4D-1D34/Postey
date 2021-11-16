import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getAuthorName } from "../../firebase/firebase.utils";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import styles from "./reply-link.module.css";

const ReplyLink = ({ replyReference, postId, commentSectionRef }) => {
  const posts = useSelector(selectCurrentPosts);
  const receiverName = useRef();

  console.log({ ...commentSectionRef.current });
  useEffect(() => {
    if (replyReference) {
      getAuthorName(posts[postId]?.comments[replyReference]?.author).then(
        (name) => {
          receiverName.current.innerText = `to ${name}`;
        }
      );
    }
  }, [replyReference]);
  return (
    <div className={styles.reply}>
      <h5 ref={receiverName}></h5>
    </div>
  );
};
export default ReplyLink;
