import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navlinks}>
      <div className={styles.ul}>
        <Link className={styles.créer} to="/demands/create">
          <li className={styles.nav}> Créer ta décision</li>
        </Link>
        <Link className={styles.encours} to="/demands/vote">
          <li className={styles.nav}> En cours de vote</li>
        </Link>
        <Link className={styles.termine} to="/demands/valid">
          <li className={styles.nav}> Votes terminés</li>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
