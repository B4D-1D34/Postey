import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "../../components/loader/loader.component";
import PostDataBlock from "../../components/post-data-block/post-data-block.component";

import RatingBox from "../../components/rating-box/rating-box.component";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import styles from "./post-page.module.css";

const PostPage = () => {
  const { postId } = useParams();
  const posts = useSelector(selectCurrentPosts);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {posts ? (
        <div className={styles.contentblock}>
          <PostDataBlock
            theme={posts[postId].theme}
            content={posts[postId].content}
            author={posts[postId].author}
            closeComments={posts[postId].closeComments}
            comments={posts[postId].comments}
            createdAt={posts[postId].createdAt}
            id={postId}
            owner={currentUser?.id === posts[postId].author}
          />
          <RatingBox postId={postId} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PostPage;
