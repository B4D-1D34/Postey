import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getAuthorName } from "../../firebase/firebase.utils";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import styles from "./reply-link.module.css";

const ReplyLink = ({ replyReference, postId, commentSectionRef }) => {
  const posts = useSelector(selectCurrentPosts);
  const receiverName = useRef();
  const timer = useRef();

  useEffect(() => {
    if (posts[postId]?.comments[replyReference]?.author) {
      getAuthorName(posts[postId]?.comments[replyReference]?.author).then(
        (name) => {
          receiverName.current.innerText = `to ${name}`;
        }
      );
    }
  }, [replyReference]);

  const showReplyReference = () => {
    if (posts[postId]?.comments[replyReference]) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      const replyRefElement = Array(
        ...commentSectionRef.current.children
      ).filter((el) => el.getAttribute("forreplylink") === replyReference)[0];
      replyRefElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      replyRefElement.classList.add(styles.showing);
      timer.current = setTimeout(() => {
        replyRefElement.classList.remove(styles.showing);
      }, 1500);
    }
  };

  return (
    <div className={styles.reply} onClick={showReplyReference}>
      <h5 ref={receiverName}>receiver</h5>
    </div>
  );
};
export default ReplyLink;
