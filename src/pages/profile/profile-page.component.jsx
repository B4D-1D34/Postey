import { useState } from "react";
import { useSelector } from "react-redux";
import ProfilePostsBlock from "../../components/profile-posts-block/profile-posts-block.component";
import ProfileSettingsBlock from "../../components/profile-settings-block/profile-settings-block.component";
import ProfileSidebar from "../../components/profile-sidebar/profile-sidebar.component";
import { selectCurrentPosts } from "../../redux/posts/posts.selectors";
import styles from "./profile-page.module.css";

const ProfilePage = () => {
  const [blockShown, setBlockShown] = useState("posts");
  const sections = ["posts", "settings"];
  const posts = useSelector(selectCurrentPosts);

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
        {blockShown === "posts" ? <ProfilePostsBlock /> : null}
        {blockShown === "settings" ? <ProfileSettingsBlock /> : null}
      </div>
    </div>
  );
};
export default ProfilePage;
