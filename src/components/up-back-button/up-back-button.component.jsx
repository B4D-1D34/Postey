import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import styles from "./up-back-button.module.css";

const UpBackButton = () => {
  const arrow = useRef();
  const history = useHistory();
  const [isBack, setIsBack] = useState(true);
  const goUpAvailable = () => {
    if (window.pageYOffset > 300) {
      arrow.current.classList.remove(styles.back);
      setIsBack(false);
    } else {
      arrow.current.classList.add(styles.back);
      setIsBack(true);
    }
  };

  const goBackOrUp = () => {
    if (isBack) {
      history.goBack();
    } else {
      window.scroll(0, 0);
    }
  };
  useEffect(() => (window.onscroll = goUpAvailable), []);
  return (
    <div className={styles.upBackBtnBlock}>
      <div className={styles.upBackBtn} onClick={goBackOrUp}>
        <div ref={arrow} className={`${styles.arrow} ${styles.back}`}>
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </div>
    </div>
  );
};
export default UpBackButton;
