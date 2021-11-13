import { useHistory } from "react-router";

import styles from "./custom-link.module.css";

const CustomLink = ({ url, children }) => {
  const history = useHistory();

  const handleLink = () => history.push(url, { prevUrl: window.location.href });

  return (
    <div className={styles.link} onClick={handleLink}>
      {children}
    </div>
  );
};
export default CustomLink;
