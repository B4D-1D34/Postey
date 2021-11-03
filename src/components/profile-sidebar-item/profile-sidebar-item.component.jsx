const ProfileSidebarItem = ({ name, blockShown, handleBlockChange }) => {
  return (
    <div
      name={name}
      style={{ backgroundColor: `${blockShown === name ? "red" : ""}` }}
      onClick={handleBlockChange}
      //   className={styles.sidebarItem}
    >
      Posts
    </div>
  );
};

export default ProfileSidebarItem;
