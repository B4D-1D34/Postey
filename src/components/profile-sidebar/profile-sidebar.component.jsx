import styles from "./profile-sidebar.module.css";

const ProfileSidebar = ({ sections, blockShown, setBlockShown }) => {
  const handleBlockChange = ({ target }) => {
    const { value } = target.attributes.name;
    setBlockShown(value);
  };
  return (
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
  );
};

export default ProfileSidebar;
