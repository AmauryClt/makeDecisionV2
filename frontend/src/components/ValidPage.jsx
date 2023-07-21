import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./validPage.module.scss";
import PopupPage from "./PopupPage";

export default function ValidPage({ isUpdated }) {
  const [demands, setDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/`)
      .then((response) => response.json())
      .then((data) => {
        setDemands(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isUpdated]);

  const openPopup = (demand) => {
    setSelectedDemand(demand);
  };

  const closePopup = () => {
    setSelectedDemand(null);
  };

  const handleFilterAll = () => {
    setFilter("all");
  };

  const handleFilterWithValidation = () => {
    setFilter("withValidation");
  };

  const handleFilterWithImplementation = () => {
    setFilter("withImplementation");
  };

  const handleFilterWithArchived = () => {
    setFilter("withArchived");
  };

  return (
    <main>
      <h1 className={styles.banniere}>Décisions archivées</h1>
      <div className={styles.block0}>
        <div className={styles.dataContainer}>
          {demands
            .filter((demand) => {
              if (filter === "all") {
                return (
                  demand.Statut === "VALIDE" ||
                  demand.Statut === "MISE EN PLACE" ||
                  demand.Statut === "ARCHIVE"
                );
              }
              if (filter === "withValidation") {
                return demand.Statut === "VALIDE";
              }
              if (filter === "withImplementation") {
                return demand.Statut === "MISE EN PLACE";
              }
              if (filter === "withArchived") {
                return demand.Statut === "ARCHIVE";
              }
              return true;
            })
            .map((demand) => (
              <div className={styles.showDemand} key={demand.Id}>
                <div className={styles.blockFrontDemand}>
                  <h3 className={styles.titleFrontDemand}>{demand.Title}</h3>
                  <p className={styles.statutFrontDemand}>{demand.Statut}</p>
                </div>
                <p className={styles.contentFrontDemand}>
                  <span dangerouslySetInnerHTML={{ __html: demand.Content }} />
                </p>
                <div
                  className={styles.buttonContainer}
                  aria-hidden
                  onClick={() => openPopup(demand)}
                  role="button"
                />
              </div>
            ))}
        </div>
        <div className={styles.guide}>
          <div className={styles.content}>
            <h2>GUIDE</h2>
            <p className={styles.faq}>
              Vous trouverez ici toutes les décisions pour lesquelles le vote
              est terminé.
            </p>
            <p className={styles.faq}>
              Vous pouvez toujours les consulter mais vous ne pouvez plus les
              commenter ni voter.
            </p>
            <button
              className={styles.btn}
              onClick={handleFilterAll}
              type="button"
            >
              Tout afficher
            </button>
            <button
              className={styles.btn}
              onClick={handleFilterWithValidation}
              type="button"
            >
              Décision validée
            </button>
            <button
              className={styles.btn}
              onClick={handleFilterWithImplementation}
              type="button"
            >
              Décision mise en place
            </button>
            <button
              className={styles.btn}
              onClick={handleFilterWithArchived}
              type="button"
            >
              Décision archivée
            </button>
          </div>
        </div>
      </div>
      {selectedDemand && (
        <PopupPage
          demand={selectedDemand}
          closePopup={closePopup}
          styles={styles}
        />
      )}
    </main>
  );
}

ValidPage.propTypes = {
  isUpdated: PropTypes.bool.isRequired,
};
