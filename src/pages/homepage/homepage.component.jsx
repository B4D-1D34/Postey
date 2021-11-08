import PostItem from "../../components/post-item/post-item.component";
import TEST_DATA from "./testPostData";
import styles from "./homepage.module.css";
import { useSelector } from "react-redux";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import NewPostForm from "../../components/new-post-form/new-post-form.component";

const HomePage = () => {
  const dbPosts = useSelector(selectCurrentPosts);
  const posts = { ...TEST_DATA, ...dbPosts };

  return (
    <div className={styles.homepage}>
      <NewPostForm />
      {Object.keys(posts)
        .map((key) => ({ ...posts[key], key }))
        .map(({ key, author, theme, createdAt, rating, comments, content }) => (
          <PostItem
            key={key}
            id={key}
            author={author}
            theme={theme}
            createdAt={
              createdAt?.nanoseconds
                ? createdAt?.seconds * 1000 + createdAt?.nanoseconds
                : createdAt?.seconds * 1000
            }
            rating={rating}
            content={content}
            commentsLength={Object.keys(comments).length}
          />
        ))}
    </div>
  );
};
export default HomePage;
