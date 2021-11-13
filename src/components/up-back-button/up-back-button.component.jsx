import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import styles from "./up-back-button.module.css";

const UpBackButton = () => {
  const arrow = useRef();
  const upBackBtn = useRef();
  const history = useHistory();
  const location = useLocation();
  const [isBack, setIsBack] = useState(true);
  const goUpAvailable = () => {
    if (window.pageYOffset > 300) {
      upBackBtn.current.classList.add(styles.reveal);
      arrow.current.classList.remove(styles.back);
      setIsBack(false);
    } else {
      upBackBtn.current.classList.remove(styles.reveal);
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
  useEffect(() => {
    window.onscroll = goUpAvailable;
  }, []);
  useEffect(() => {
    const goBackAvailable = () => {
      if (location.state) {
        upBackBtn.current.classList.remove(styles.noBackBtn);
      } else {
        upBackBtn.current.classList.add(styles.noBackBtn);
      }
    };
    goBackAvailable();
  }, [location.state]);
  return (
    <div className={styles.upBackBtnBlock}>
      <div ref={upBackBtn} className={styles.upBackBtn} onClick={goBackOrUp}>
        <div ref={arrow} className={`${styles.arrow} ${styles.back}`}>
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </div>
    </div>
  );
};
export default UpBackButton;
