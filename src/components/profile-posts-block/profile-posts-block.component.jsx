import { useSelector } from "react-redux";
import PostItem from "../post-item/post-item.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import styles from "./profile-posts-block.module.css";
import { useState } from "react";
import ProfileSidebar from "../profile-sidebar/profile-sidebar.component";

const ProfilePostsBlock = () => {
  const currentUser = useSelector(selectCurrentUser);
  const posts = useSelector(selectCurrentPosts);
  const sections = ["your posts", "rated"];
  const [blockShown, setBlockShown] = useState("your posts");

  const userPosts = Object.keys(posts)
    .map((key) => ({ id: key, ...posts[key] }))
    .filter((post) => post.author === currentUser?.id);
  const allComments = Object.keys(posts).reduce(
    (acc, key) => ({
      ...acc,
      ...posts[key].comments,
    }),
    []
  );
  const userComments = Object.keys(allComments)
    .map((key) => ({ id: key, ...allComments[key] }))
    .filter((comment) => comment.author === currentUser.id);
  const ratedPosts = Object.keys(currentUser?.rates)
    .filter((key) => currentUser?.rates[key])
    .reduce(
      (acc, key) => (posts[key] ? [...acc, { id: key, ...posts[key] }] : acc),
      []
    );
  const totalRating =
    userPosts.reduce((acc, post) => (acc += post.rating), 0) +
    userComments.reduce((acc, comment) => (acc += comment.rating), 0);
  const ratesCount = Object.keys(currentUser?.rates).filter(
    (key) => currentUser?.rates[key]
  ).length;
  return (
    <div className={styles.postsblock}>
      <div className={styles.header}>
        <div className={styles.stats}>
          <h3>Total rating: {totalRating}</h3>
          <h3>Rates made: {ratesCount}</h3>
          <h3>Posts written: {userPosts.length}</h3>
          <h3>Comments written: {userComments.length}</h3>
        </div>
        <ProfileSidebar
          sections={sections}
          blockShown={blockShown}
          setBlockShown={setBlockShown}
        />
      </div>
      {blockShown === "your posts" ? (
        <>
          <h1 className={styles.title}>Your Posts</h1>
          {userPosts.length ? (
            userPosts.map(
              ({ id, author, theme, createdAt, rating, content, comments }) => (
                <PostItem
                  key={id}
                  id={id}
                  author={author}
                  theme={theme}
                  createdAt={
                    createdAt?.nanoseconds
                      ? createdAt?.seconds * 1000 +
                        createdAt?.nanoseconds / 1000000
                      : createdAt?.seconds * 1000
                  }
                  rating={rating}
                  content={content}
                  commentsLength={comments ? Object.keys(comments).length : 0}
                />
              )
            )
          ) : (
            <h2>You have no posts written</h2>
          )}
        </>
      ) : null}
      {blockShown === "rated" ? (
        <>
          <h1 className={styles.title}>Rated Posts</h1>
          {ratedPosts.length ? (
            ratedPosts.map(
              ({ id, author, theme, createdAt, rating, content, comments }) => (
                <PostItem
                  key={id}
                  id={id}
                  author={author}
                  theme={theme}
                  createdAt={
                    createdAt?.nanoseconds
                      ? createdAt?.seconds * 1000 +
                        createdAt?.nanoseconds / 1000000
                      : createdAt?.seconds * 1000
                  }
                  rating={rating}
                  content={content}
                  commentsLength={comments ? Object.keys(comments).length : 0}
                />
              )
            )
          ) : (
            <h2>You haven't rate any posts yet</h2>
          )}
        </>
      ) : null}
    </div>
  );
};
export default ProfilePostsBlock;
