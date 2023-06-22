import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navlinks}>
      <div className={styles.ul}>
        <Link className={styles.créer} to="/CreatePage">
          <li> Créer ta décision</li>
        </Link>
        <Link className={styles.encours} to="/VotePage">
          <li> En cours de vote</li>
        </Link>
        <Link className={styles.termine} to="/ValidPage">
          <li> Votation terminé</li>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
