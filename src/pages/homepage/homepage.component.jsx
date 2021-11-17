import { useState } from "react";
import { useSelector } from "react-redux";

import PostItem from "../../components/post-item/post-item.component";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import NewPostForm from "../../components/new-post-form/new-post-form.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Loader from "../../components/loader/loader.component";
import SortBox, {
  postsSort,
} from "../../components/sort-box/sort-box.component";

import styles from "./homepage.module.css";

const HomePage = () => {
  const posts = useSelector(selectCurrentPosts);
  const currentUser = useSelector(selectCurrentUser);
  const [sort, setSort] = useState("time");
  const [sortDirection, setSortDirection] = useState("decr");

  return (
    <div className={styles.homepage}>
      {posts ? (
        <SortBox
          sort={sort}
          setSort={setSort}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      ) : null}
      <div className={styles.mainContentContainer}>
        {currentUser && posts ? <NewPostForm /> : null}
        {posts ? (
          Object.keys(posts)
            .map((key) => ({ ...posts[key], key }))
            .sort((a, b) => postsSort(a, b, sort, sortDirection))
            .map(
              ({
                key,
                author,
                theme,
                createdAt,
                rating,
                comments,
                content,
              }) => (
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
    </div>
  );
};
export default HomePage;
