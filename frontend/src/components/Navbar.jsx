import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { token, userId } = useAuth();

  console.info("ID de l'utilisateur:", userId);
  console.info("token de cette connection:", token);

  return (
    <nav className={styles.navlinks}>
      <div className={styles.ul}>
        <Link className={styles.créer} to="/demands/create">
          <li> Créer ta décision</li>
        </Link>
        <Link className={styles.encours} to="/demands/vote">
          <li> En cours de vote</li>
        </Link>
        <Link className={styles.termine} to="/demands/valid">
          <li> Votation terminé</li>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
