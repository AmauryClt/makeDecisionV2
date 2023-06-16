import { useState } from "react";
import styles from "./counter.module.scss";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <p className={styles.buttonTest}>
      <button
        type="button"
        onClick={() => setCount((oldCount) => oldCount + 1)}
      >
        count is: {count}
      </button>
    </p>
  );
}
