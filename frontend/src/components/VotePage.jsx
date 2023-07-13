import React, { useState, useEffect } from "react";
import styles from "./votePage.module.scss";
import PopupPage from "./PopupPage";

export default function VotePage() {
  const [demands, setDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/demands`
        );
        const data = await response.json();
        setIsUpdated(true);
        setDemands(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isUpdated]);

  const openPopup = (demand) => {
    setSelectedDemand(demand);
  };

  const closePopup = () => {
    setSelectedDemand(null);
  };

  return (
    <main>
      <h1 className={styles.banniere}>Décision en attente de vote</h1>
      <div className={styles.block0}>
        <div className={styles.dataContainer}>
          {demands.map((demand) => (
            <div className={styles.showDemand} key={demand.Id}>
              <div className={styles.blockFrontDemand}>
                <h3 className={styles.titleFrontDemand}>{demand.Title}</h3>
                <p className={styles.statutFrontDemand}>{demand.Statut}</p>
              </div>
              <p className={styles.contentFrontDemand}>{demand.Content}</p>
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
