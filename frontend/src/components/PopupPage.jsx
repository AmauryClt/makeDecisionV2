import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./popupPage.module.scss";
import exitButtonImage from "../assets/bouttonExit.png";
import editButtonImage from "../assets/modifier.png";

export default function PopupPage({ demand, closePopup }) {
  const navigate = useNavigate();
  const editDemand = () => {
    navigate(`/demands/update/${demand.Id}`);
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <div className={styles.buttons}>
          <div>
            <img
              aria-hidden
              src={editButtonImage}
              alt="Edit"
              className={styles.editButton}
              onClick={editDemand}
            />
          </div>
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
        <div className={styles.block1}>
          <div className={styles.block2}>
            <div className={styles.block3}>
              <h3 className={styles.title}>{demand.Title}</h3>
              <p className={styles.username}>
                {demand.Lastname} {demand.Firstname}
              </p>
            </div>
            <div className={styles.block4}>
              <p>{demand.Content}</p>
              <p>{demand.Benefice}</p>
              <p>{demand.Inconvenience}</p>
            </div>
          </div>
          <div className={styles.block5}>
            <p>{demand.Deadline}</p>
            <p>{demand.Note}</p>
            <p>{demand.Statut}</p>
            <p>Avancement des votes</p>
            <p>Salarié Votant</p>
            <p>Expert Votant</p>
          </div>
        </div>
      </div>
    </div>
  );
}

PopupPage.propTypes = {
  demand: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    Lastname: PropTypes.string.isRequired,
    Firstname: PropTypes.string.isRequired,
    Content: PropTypes.string.isRequired,
    Benefice: PropTypes.string.isRequired,
    Inconvenience: PropTypes.string.isRequired,
    Deadline: PropTypes.string.isRequired,
    Note: PropTypes.number.isRequired,
    Statut: PropTypes.string.isRequired,
  }).isRequired,
  closePopup: PropTypes.func.isRequired,
};
