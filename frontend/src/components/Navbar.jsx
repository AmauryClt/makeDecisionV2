import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navlinks}>
      <div className={styles.ul}>
        <Link className={styles.créer} to="/créertadécision">
          <li> Créer ta décision</li>
        </Link>
        <Link className={styles.encours} to="/VotePage">
          <li> En cours de vote</li>
        </Link>
        <Link className={styles.termine} to="/ValidPage">
          <li> Votation terminé</li>
        </Link>
      </div>
      <style>
        @import
        url("https://fonts.googleapis.com/css2?family=Lato:wght@300;900&family=Permanent+Marker&family=Raleway:wght@900&display=swap");
      </style>
    </nav>
  );
}

export default Navbar;
