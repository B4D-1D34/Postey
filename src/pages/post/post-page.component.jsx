import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CommentSection from "../../components/comment-section/comment-section.component";
import Loader from "../../components/loader/loader.component";
import PostDataBlock from "../../components/post-data-block/post-data-block.component";
import PostNotFound from "../../components/post-not-found/post-not-found.component";

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
        posts[postId] ? (
          <div>
            <div className={styles.contentblock}>
              <PostDataBlock
                theme={posts[postId].theme}
                content={posts[postId].content}
                author={posts[postId].author}
                closeComments={posts[postId].closeComments}
                createdAt={posts[postId].createdAt}
                id={postId}
                owner={currentUser?.id === posts[postId].author}
              />
              <RatingBox postId={postId} />
            </div>
            <CommentSection
              comments={posts[postId].comments}
              postAuthor={posts[postId].author}
              postId={postId}
              closeComments={posts[postId].closeComments}
              currentUser={currentUser}
            />
          </div>
        ) : (
          <PostNotFound />
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PostPage;
