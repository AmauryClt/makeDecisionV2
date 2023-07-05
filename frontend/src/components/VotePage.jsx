import React, { useState, useEffect } from "react";
import styles from "./votePage.module.scss";

export default function VotePage() {
  const [demands, setDemands] = useState([]);

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

  return (
    <main>
      <h1 className={styles.banniere}>Décision en attente de vote</h1>
      <div className={styles.dataContainer}>
        {demands.map((demand) => (
          <div key={demand.Id}>
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
    </main>
  );
}
