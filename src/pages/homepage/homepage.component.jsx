import PostItem from "../../components/post-item/post-item.component";
import TEST_DATA from "./testPostData";
import styles from "./homepage.module.css";

const HomePage = () => {
  const posts = TEST_DATA;

  return (
    <div className={styles.homepage}>
      <h1>Homepage</h1>
      {Object.keys(posts)
        .map((key) => posts[key])
        .map((user) => user.posts)
        .reduce((arr, posts) => arr.concat(posts), [])
        .map(({ id, author, theme, createdAt, rating, comments, content }) => (
          <PostItem
            key={id}
            author={author}
            theme={theme}
            createdAt={createdAt}
            rating={rating}
            content={content}
            commentsLength={comments.length}
          />
        ))}
    </div>
  );
};
export default HomePage;
