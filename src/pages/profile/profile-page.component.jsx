import { useState } from "react";
import ProfileSettingsBlock from "../../components/profile-settings-block/profile-settings-block.component";
import styles from "./profile-page.module.css";

const ProfilePage = () => {
  const [blockShown, setBlockShown] = useState("posts");
  const sections = ["posts", "settings"];
  const handleBlockChange = ({ target }) => {
    const { value } = target.attributes.name;
    setBlockShown(value);
    target.classList.add("active");
  };
  return (
    <div className={styles.profilepage}>
      <div className={styles.sidebar}>
        {sections.map((name) => (
          <div
            name={name}
            key={name}
            style={{
              background: `${blockShown === name ? "rgb(255, 193, 111)" : ""}`,
            }}
            onClick={handleBlockChange}
            className={styles.sidebarItem}
          >
            {name[0].toUpperCase().concat(name.slice(1))}
          </div>
        ))}
      </div>
      <div className={styles.contentblock}>
        {blockShown === "posts" ? (
          <div className={styles.postsblock}>
            <h1>Your Posts</h1>
          </div>
        ) : null}
        {blockShown === "settings" ? <ProfileSettingsBlock /> : null}
      </div>
    </div>
  );
};
export default ProfilePage;
