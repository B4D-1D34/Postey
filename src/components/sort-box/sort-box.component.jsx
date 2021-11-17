import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./sort-box.module.css";

export const postsSort = (a, b, sort, sortDirection) => {
  if (sort === "time") {
    if (sortDirection === "decr") {
      return b.createdAt - a.createdAt;
    } else {
      return a.createdAt - b.createdAt;
    }
  } else if (sort === "comments") {
    const aLength = a.comments ? Object.keys(a.comments).length : 0;
    const bLength = b.comments ? Object.keys(b.comments).length : 0;
    if (sortDirection === "decr") {
      return bLength - aLength;
    } else {
      return aLength - bLength;
    }
  } else if (sort === "rating") {
    if (sortDirection === "decr") {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  }
};

const SortBox = ({ sort, setSort, sortDirection, setSortDirection }) => {
  const sortOptions = ["time", "comments", "rating"];
  const sortDirectionOptions = [
    { name: "incr", icon: faArrowUp },
    { name: "decr", icon: faArrowDown },
  ];

  const handleSort = ({ target }) => {
    const { value } = target.attributes.name;
    setSort(value);
  };

  const handleSortDirection = ({ target }) => {
    const { value } = target.attributes.name;
    setSortDirection(value);
  };
  return (
    <div className={styles.sortBox}>
      <div className={styles.titleAndDirection}>
        <h4 className={styles.title}>Sort by</h4>
        {sortDirectionOptions.map((option) => (
          <div
            className={`${styles.sortDirectionBtn} ${
              sortDirection === option.name ? styles.selected : null
            }`}
            name={option.name}
            key={option.name}
            onClick={handleSortDirection}
          >
            <FontAwesomeIcon icon={option.icon} className={styles.icon} />
          </div>
        ))}
      </div>
      {sortOptions.map((option) => (
        <div
          className={styles.sortBoxItem}
          name={option}
          key={option}
          onClick={handleSort}
          style={{
            background: `${sort === option ? "rgb(255, 193, 111)" : ""}`,
          }}
        >
          {option[0].toUpperCase().concat(option.slice(1))}
        </div>
      ))}
    </div>
  );
};

export default SortBox;
