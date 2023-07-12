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
              <h3 className={styles.username}>{demand.Lastname}</h3>
            </div>
            <div className={styles.block4}>
              <div className={styles.block4Content}>
                <h4>Détail de la prise de décision :</h4>
                <p className={styles.pBorder}>{demand.Content}</p>
                <h4>Impact sur l'organisation :</h4>
                <p className={styles.pBorder}>{demand.Utility}</p>
                <h4>Bénéfices :</h4>
                <p className={styles.pBorder}>{demand.Benefice}</p>
                <h4>Risque potentiels :</h4>
                <p className={styles.pBorder}>{demand.Inconvenience}</p>
                <h4>Commentaire :</h4>
                <p className={styles.pBorder}>{demand.Complement}</p>
              </div>
            </div>
          </div>
          <div className={styles.block5}>
            <div className={styles.block5Content}>
              <h4 className={styles.h4Block5}>Date de cloture des votes :</h4>
              <p className={styles.pBorder}>{demand.Deadline}</p>
              <h4 className={styles.h4Block5}>Note :</h4>
              <p className={styles.pBorder}>{demand.Note}</p>
              <h4 className={styles.h4Block5}>Statut de la demande :</h4>
              <p className={styles.pBorder}>{demand.Statut}</p>
              <h4 className={styles.h4Block5}>Avancement des votes :</h4>
              <p className={styles.pBorder}>provisoire</p>
              <h4 className={styles.h4Block5}>Salarié Votant :</h4>
              <p className={styles.pBorder}>provisoire</p>
              <h4 className={styles.h4Block5}>Expert Votant :</h4>
              <p className={styles.pBorder}>provisoire</p>
              <h4 className={styles.h4Block5}>Service Impacté :</h4>
              <p className={styles.pBorder}>{demand.ServiceImpact}</p>
            </div>
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
