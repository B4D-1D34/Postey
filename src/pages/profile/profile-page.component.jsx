import { useState } from "react";
import { useSelector } from "react-redux";
import ProfilePostsBlock from "../../components/profile-posts-block/profile-posts-block.component";
import ProfileSettingsBlock from "../../components/profile-settings-block/profile-settings-block.component";
import ProfileSidebar from "../../components/profile-sidebar/profile-sidebar.component";
import Loader from "../../components/loader/loader.component";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import styles from "./profile-page.module.css";

const ProfilePage = () => {
  const [blockShown, setBlockShown] = useState("posts");
  const sections = ["posts", "settings"];
  const posts = useSelector(selectCurrentPosts);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className={styles.profilepage}>
      <div className={styles.sidebarContainer}>
        {posts ? (
          <ProfileSidebar
            sections={sections}
            blockShown={blockShown}
            setBlockShown={setBlockShown}
          />
        ) : null}
      </div>
      <div className={styles.contentblock}>
        {blockShown === "posts" ? (
          posts && currentUser ? (
            <ProfilePostsBlock currentUser={currentUser} posts={posts} />
          ) : (
            <Loader />
          )
        ) : null}
        {blockShown === "settings" ? <ProfileSettingsBlock /> : null}
      </div>
    </div>
  );
};
export default ProfilePage;
