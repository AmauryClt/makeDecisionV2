import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useUser } from "../contexts/UserContext";
import styles from "./popupPage.module.scss";
import exitButtonImage from "../assets/bouttonExit.png";
import editButtonImage from "../assets/modifier.png";

export default function PopupPage({ demand, closePopup }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const editDemand = () => {
    navigate(`/demands/update/${demand.Id}`);
  };

  return (
    <div className={styles.popupContainer}>
      <Scrollbars style={{ height: "95%", marginRight: "1.5px" }}>
        <div className={styles.popupContentbar}>
          <div className={styles.closeButton}>
            {user.Id === demand.UserId && (
              <div>
                <img
                  aria-hidden
                  src={editButtonImage}
                  alt="Edit"
                  className={styles.editButton}
                  onClick={editDemand}
                />
              </div>
            )}
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
                <h3 className={styles.username}>
                  {demand.Lastname} {demand.Firstname}
                </h3>
              </div>
              <div className={styles.block4}>
                <div className={styles.block4Content}>
                  <h4>Détail de la prise de décision :</h4>
                  <p className={styles.contentFrontDemand}>
                    <span
                      dangerouslySetInnerHTML={{ __html: demand.Content }}
                    />
                  </p>
                  <h4>Bénéfices :</h4>
                  <p className={styles.pBorderComment}>{demand.Benefice}</p>
                  <h4>Risque potentiels :</h4>
                  <p className={styles.pBorderComment}>
                    {demand.Inconvenience}
                  </p>
                  <h4>Commentaire :</h4>
                  <p className={styles.pBorderComment}>provisoire</p>
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
                <p className={styles.pBorder}>{demand.ServicesImpacts}</p>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
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
    ServicesImpacts: PropTypes.string.isRequired,
    UserId: PropTypes.number.isRequired,
  }).isRequired,
  closePopup: PropTypes.func.isRequired,
};
