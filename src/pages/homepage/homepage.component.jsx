import PostItem from "../../components/post-item/post-item.component";
import styles from "./homepage.module.css";
import { useSelector } from "react-redux";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import NewPostForm from "../../components/new-post-form/new-post-form.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Loader from "../../components/loader/loader.component";

const HomePage = () => {
  const posts = useSelector(selectCurrentPosts);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className={styles.homepage}>
      {currentUser && posts ? <NewPostForm /> : null}
      {posts ? (
        Object.keys(posts)
          .map((key) => ({ ...posts[key], key }))
          .map(
            ({ key, author, theme, createdAt, rating, comments, content }) => (
              <PostItem
                key={key}
                id={key}
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
        <Loader />
      )}
    </div>
  );
};
export default HomePage;
