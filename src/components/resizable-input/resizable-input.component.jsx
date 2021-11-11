import { useEffect, useRef } from "react";
import styles from "./resizable-input.module.css";

const ResizableInput = ({ handleChange, content, isEditing }) => {
  const hiddenDiv = useRef();
  const visibleInput = useRef();

  const handleResize = (e) => {
    if (e) {
      handleChange(e);
    }
    const threeLinesHeight =
      parseInt(getComputedStyle(hiddenDiv.current).lineHeight) * 3;
    visibleInput.current.style.height = threeLinesHeight.toString() + "px";
    hiddenDiv.current.innerHTML = visibleInput.current.value.replaceAll(
      "\n",
      "<br/> "
    );
    if (threeLinesHeight < hiddenDiv.current.scrollHeight) {
      visibleInput.current.style.height =
        hiddenDiv.current.scrollHeight.toString() + "px";
    }
  };

  useEffect(() => {
    if (!content) {
      handleResize("");
    }
  }, [content, handleResize]);

  useEffect(() => {
    handleResize("");
  }, [isEditing, handleResize]);

  return (
    <div className={styles.resizableInput}>
      <div className={styles.hiddenContent} ref={hiddenDiv} />
      <textarea
        className={styles.content}
        name="content"
        ref={visibleInput}
        value={content}
        placeholder="Type here..."
        onChange={handleResize}
        required
      />
    </div>
  );
};

export default ResizableInput;
