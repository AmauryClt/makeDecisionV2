/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import styles from "./votePage.module.scss";

export default function VotePage() {
  const [demands, setDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/demand")
      .then((response) => response.json())
      .then((data) => {
        setDemands(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
            <div
              aria-hidden
              className={styles.showDemand}
              key={demand.Id}
              onClick={() => openPopup(demand)}
              role="button"
            >
              <h3 className={styles.titleFrontDemand}>{demand.Title}</h3>
              <p className={styles.statutFrontDemand}>{demand.Statut}</p>
              <p className={styles.contentFrontDemand}>{demand.Content}</p>
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
        <div className={`${styles.popup} ${styles.popupContainer}`}>
          <div className={styles.popupContent}>
            <button
              className={styles.popupButton}
              type="button"
              onClick={closePopup}
            >
              X
            </button>
            <div className={styles.block1}>
              <div className={styles.block2}>
                <div className={styles.block3}>
                  <h3 className={styles.title}>{selectedDemand.Title}</h3>
                  <p className={styles.username}>{selectedDemand.Lastname}</p>
                </div>
                <div className={styles.block4}>
                  <p>{selectedDemand.Content}</p>
                  <p>{selectedDemand.Utility}</p>
                  <p>{selectedDemand.Context}</p>
                  <p>{selectedDemand.Benefice}</p>
                  <p>{selectedDemand.Inconvenience}</p>
                  <p>{selectedDemand.Complement}</p>
                </div>
              </div>
              <div className={styles.block5}>
                <p>{selectedDemand.Deadline}</p>
                <p>{selectedDemand.Note}</p>
                <p>{selectedDemand.Statut}</p>
                <p>Avancement des votes</p>
                <p>Salarié Votant</p>
                <p>Expert Votant</p>
                <p>{selectedDemand.ServiceImpact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
