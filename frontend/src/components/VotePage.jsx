import React, { useState, useEffect } from "react";
import styles from "./votePage.module.scss";
import PopupPage from "./PopupPage";

export default function VotePage() {
  const [demands, setDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/demands`
        );
        const data = await response.json();
        setDemands(data);
        const state = window.history.state || {};
        setIsUpdated(state.isUpdated || false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isUpdated) {
      window.location.reload();
    }
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

  const handleFilterWithoutDisagreement = () => {
    setFilter("withoutDisagreement");
  };

  const handleFilterWithDisagreement = () => {
    setFilter("withDisagreement");
  };

  return (
    <main>
      <h1 className={styles.banniere}>Décision en attente de vote</h1>
      <div className={styles.block0}>
        <div className={styles.dataContainer}>
          {demands
            .filter((demand) => {
              if (filter === "all") {
                return (
                  demand.Statut === "EN ATTENTE DE VOTE" ||
                  demand.Statut === "EN DESACCORD"
                );
              }
              if (filter === "withoutDisagreement") {
                return demand.Statut === "EN ATTENTE DE VOTE";
              }
              if (filter === "withDisagreement") {
                return demand.Statut === "EN DESACCORD";
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
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <button
              className={styles.btn}
              onClick={handleFilterAll}
              type="button"
            >
              Tout afficher
            </button>
            <button
              className={styles.btn}
              onClick={handleFilterWithoutDisagreement}
              type="button"
            >
              Décision sans Désaccord
            </button>
            <button
              className={styles.btn}
              onClick={handleFilterWithDisagreement}
              type="button"
            >
              Décision avec Désaccord
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
