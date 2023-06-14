import React from "react";
import styles from "./header.module.scss";

function header() {
  return (
    <nav className={styles.headLinks}>
      <img
        className={styles.logo}
        src="./src/assets/logo.png"
        alt="make-sense"
      />
      <div className={styles.Liens}>
        <div className={styles.create} to="/Créer-ta-décision">
          Créer ta décision
        </div>
        <div className={styles.running} to="/en-cours-de-vote">
          En cours de vote
        </div>
        <div className={styles.finish} to="/votation-terminé">
          Votation terminé
        </div>
      </div>
      <div className={styles.rangement}>
        <img className={styles.pp} src="./src/assets/test.jpg" alt="random" />
        <div className={styles.profile}>Eliott LAREINE</div>
      </div>
      <style>
        @import
        url("https://fonts.googleapis.com/css2?family=Lato:wght@300;900&family=Permanent+Marker&family=Raleway:wght@900&display=swap");
      </style>
    </nav>
  );
}

export default header;
