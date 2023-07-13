import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import Navbar from "./Navbar";

function header() {
  return (
    <nav className={styles.headLinks}>
      <Link to="/Menu">
        <img
          className={styles.logo}
          src="./src/assets/logo.png"
          alt="make-sense"
        />
      </Link>
      <div className={styles.Liens}>
        <Navbar />
      </div>
      <div className={styles.rangement}>
        <Link to="/Profil">
          <img className={styles.pp} src="./src/assets/test.jpg" alt="random" />
        </Link>
        <Link className={styles.name} to="Profil">
          <div>Eliott LAREINE</div>
        </Link>
      </div>
      <style>
        @import
        url("https://fonts.googleapis.com/css2?family=Lato:wght@300;900&family=Permanent+Marker&family=Raleway:wght@900&display=swap");
      </style>
    </nav>
  );
}

export default header;
