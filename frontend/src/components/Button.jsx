import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Button.module.scss";

export default function Button({ children, addValue, removeValue }) {
  const [buttonState, setButtonState] = useState(styles.buttonNoClic);

  const handleClick = () => {
    if (buttonState === styles.buttonNoClic) {
      setButtonState(styles.buttonClic);
      addValue(children);
    } else {
      setButtonState(styles.buttonNoClic);
      removeValue(children);
    }
  };

  return (
    <button className={buttonState} type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  addValue: PropTypes.func.isRequired,
  removeValue: PropTypes.func.isRequired,
};
