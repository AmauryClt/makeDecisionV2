import React from "react";
import PropTypes from "prop-types";
import styles from "./popupUser.module.scss";
import exitButtonImage from "../assets/bouttonExit.png";

export default function PopupUser({ allUser, closePopup }) {
  return (
    <div className={styles.popupContainerUser}>
      <h3>Username: {allUser.username}</h3>
      <h3>Firstname: {allUser.Firstname}</h3>
      <h3>Lastname: {allUser.Lastname}</h3>
      <h3>Numeromob: {allUser.Numeromob}</h3>
      <h3>Numerofix: {allUser.Numerofix}</h3>
      <h3>Admin: {allUser.Admin}</h3>
      <div>
        <img
          aria-hidden
          src={exitButtonImage}
          alt="Exit"
          className={styles.closeButton}
          onClick={closePopup}
        />
      </div>
    </div>
  );
}

PopupUser.propTypes = {
  allUser: PropTypes.shape({
    username: PropTypes.string,
    Firstname: PropTypes.string,
    Lastname: PropTypes.string,
    Numeromob: PropTypes.string,
    Numerofix: PropTypes.string,
    Admin: PropTypes.number,
  }).isRequired,
  closePopup: PropTypes.func.isRequired,
};
