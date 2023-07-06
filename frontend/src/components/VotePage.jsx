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
      <div className={styles.dataContainer}>
        {demands.map((demand) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div key={demand.Id} onClick={() => openPopup(demand)}>
            <h3>{demand.Title}</h3>
            <p>{demand.Statut}</p>
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
                  <p className={styles.username}>{selectedDemand.user_Id}</p>
                </div>
                <div className={styles.block4}>
                  <p>{selectedDemand.Content}</p>
                  <p>{selectedDemand.Utility}</p>
                  <p>{selectedDemand.Context}</p>
                  <p>{selectedDemand.Benefice}</p>
                  <p>{selectedDemand.Inconvenience}</p>
                  <p>{selectedDemand.Complement}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Hendrerit gravida rutrum quisque non tellus orci ac
                    auctor augue. Risus sed vulputate odio ut enim blandit
                    volutpat maecenas volutpat. Dictum fusce ut placerat orci
                    nulla pellentesque. Ac ut consequat semper viverra nam
                    libero. Hac habitasse platea dictumst quisque sagittis purus
                    sit amet. Porttitor rhoncus dolor purus non enim praesent
                    elementum facilisis leo. Arcu non sodales neque sodales ut
                    etiam. Euismod elementum nisi quis eleifend quam adipiscing
                    vitae proin. Malesuada fames ac turpis egestas sed. Viverra
                    mauris in aliquam sem fringilla ut morbi tincidunt augue.
                    Leo vel orci porta non pulvinar neque laoreet suspendisse
                    interdum. Ullamcorper malesuada proin libero nunc consequat
                    interdum varius sit. Sit amet tellus cras adipiscing.
                    Ultrices gravida dictum fusce ut placerat orci. Ut porttitor
                    leo a diam sollicitudin tempor id eu nisl. Massa tincidunt
                    dui ut ornare lectus sit amet est placerat. Lectus
                    vestibulum mattis ullamcorper velit. Amet justo donec enim
                    diam vulputate ut pharetra sit. Pellentesque elit
                    ullamcorper dignissim cras tincidunt lobortis feugiat. Risus
                    pretium quam vulputate dignissim suspendisse. Nibh sit amet
                    commodo nulla facilisi nullam vehicula. Nam at lectus urna
                    duis convallis convallis tellus. Neque convallis a cras
                    semper auctor neque. Viverra accumsan in nisl nisi
                    scelerisque. Fermentum dui faucibus in ornare quam viverra
                    orci. Sed viverra tellus in hac habitasse. Senectus et netus
                    et malesuada fames ac. Posuere lorem ipsum dolor sit amet
                    consectetur adipiscing elit. Etiam non quam lacus
                    suspendisse faucibus interdum posuere lorem. Velit laoreet
                    id donec ultrices tincidunt arcu non. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Hendrerit
                  </p>
                </div>
              </div>
              <div className={styles.block5}>
                <p>{selectedDemand.Deadline}</p>
                <p>{selectedDemand.Note}</p>
                <p>{selectedDemand.Statut}</p>
                <p>Avancement des votes</p>
                <p>Salarié Votant</p>
                <p>Expert Votant</p>
                <p>Service impacté</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
