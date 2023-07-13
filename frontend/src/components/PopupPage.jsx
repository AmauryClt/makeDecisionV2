import React from "react";
import PropTypes from "prop-types";
import styles from "./popupPage.module.scss";
import exitButtonImage from "../assets/bouttonExit.png";

export default function PopupPage({ demand, closePopup }) {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <div className={styles.closeButton}>
          <img
            aria-hidden
            src={exitButtonImage}
            alt="Exit"
            className={styles.closeButtonImage}
            onClick={closePopup}
          />
        </div>
        <div className={styles.block1}>
          <div className={styles.block2}>
            <div className={styles.block3}>
              <h3 className={styles.title}>{demand.Title}</h3>
              <p className={styles.username}>{demand.Lastname}</p>
            </div>
            <div className={styles.block4}>
              <p>{demand.Content}</p>
              <p>{demand.Utility}</p>
              <p>{demand.Context}</p>
              <p>{demand.Benefice}</p>
              <p>{demand.Inconvenience}</p>
              <p>{demand.Complement}</p>
            </div>
          </div>
          <div className={styles.block5}>
            <p>{demand.Deadline}</p>
            <p>{demand.Note}</p>
            <p>{demand.Statut}</p>
            <p>Avancement des votes</p>
            <p>Salarié Votant</p>
            <p>Expert Votant</p>
            <p>{demand.ServiceImpact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

PopupPage.propTypes = {
  demand: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Lastname: PropTypes.string.isRequired,
    Content: PropTypes.string.isRequired,
    Utility: PropTypes.string.isRequired,
    Context: PropTypes.string.isRequired,
    Benefice: PropTypes.string.isRequired,
    Inconvenience: PropTypes.string.isRequired,
    Complement: PropTypes.string.isRequired,
    Deadline: PropTypes.string.isRequired,
    Note: PropTypes.string.isRequired,
    Statut: PropTypes.string.isRequired,
    ServiceImpact: PropTypes.string.isRequired,
  }).isRequired,
  closePopup: PropTypes.func.isRequired,
};
