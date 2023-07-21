import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import Stars from "./Stars";
import AlgoNote from "./AlgoNote";
import { useUser } from "../contexts/UserContext";
import styles from "./popupPage.module.scss";
import exitButtonImage from "../assets/bouttonExit.png";
import editButtonImage from "../assets/modifier.png";
import CommentFunction from "./CommentFunction";
import MemberByVote from "./MemberByVote";

export default function PopupPage({ demand, closePopup, toastOptions }) {
  const [notesByDemand, setNotesByDemand] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const editDemand = () => {
    navigate(`/demands/update/${demand.Id}`);
  };

  useEffect(() => {
    const fetchNotesByDemand = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/notes/${demand.Id}`
        );

        if (response.ok) {
          const data = await response.json();
          setNotesByDemand(data.notes);
        } else {
          console.error("Impossible de récupérer les notes pour la demande.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des notes :", error);
      }
    };

    fetchNotesByDemand();
  }, [demand.Id]);

  console.info(notesByDemand);

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
                  <CommentFunction demand={demand} />
                </div>
              </div>
            </div>
            <div className={styles.block5}>
              <div className={styles.block5Content}>
                <h4 className={styles.h4Block5}>Date de cloture des votes :</h4>
                <p className={styles.pBorder}>{demand.Deadline}</p>
                <h4 className={styles.h4Block5}>Statut de la demande :</h4>
                <p className={styles.pBorder}>{demand.Statut}</p>
                <h4 className={styles.h4Block5}>Avancement des votes :</h4>
                <div className={styles.pBorder}>
                  <AlgoNote notesByDemand={notesByDemand} />
                </div>
                <h4 className={styles.h4Block5}>Salarié Votant :</h4>
                <MemberByVote demandId={demand.Id} />
                <h4 className={styles.h4Block5exception}>Service Impacté :</h4>
                <p className={styles.pBorder}>{demand.ServicesImpacts}</p>
                <h4 className={styles.h4Block5}>Note de la Demande :</h4>
                <div className={styles.pBorderexeption}>
                  <Stars
                    demand={demand}
                    notesByDemand={notesByDemand}
                    toastOptions={toastOptions}
                  />
                </div>
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
    NoteDemand: PropTypes.number,
    Statut: PropTypes.string.isRequired,
    ServicesImpacts: PropTypes.string,
    UserId: PropTypes.number.isRequired,
  }).isRequired,
  closePopup: PropTypes.func.isRequired,
};

PopupPage.propTypes = {
  toastOptions: PropTypes.shape.isRequired,
};
