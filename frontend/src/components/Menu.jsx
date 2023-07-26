import { Link } from "react-router-dom";
import styles from "./menu.module.scss";
import creer from "../assets/makesensecréer.jpg";
import valide from "../assets/makesensevalide.jpg";
import vote from "../assets/encoursdevote.jpeg";

export default function Menu() {
  return (
    <main>
      <h1 className={styles.banniere}> Make A Desision</h1>
      <div className={styles.mainHome}>
        <Link className={styles.Creer} to="/demands/create">
          <img className={styles.imgCards} src={creer} alt="Makesense.Logo" />
          <div className={styles.blocTitle}>
            <h2 className={styles.TitreHome}>
              <div className={styles.buttonYellow} />
              Créer ta décision
              <div className={styles.buttonYellow} />
            </h2>
            <p className={styles.TexteHome}>
              Soit force de proposition pour changer le monde!
            </p>
          </div>
        </Link>
        <Link className={styles.EnCours} to="demands/vote">
          <img className={styles.imgCards} src={vote} alt="Makesense.Logo" />
          <div className={styles.blocTitle}>
            <h2 className={styles.TitreHome}>
              <div className={styles.buttonGreen} />
              En cours de vote
              <div className={styles.buttonGreen} />
            </h2>
            <p className={styles.TexteHome}>
              Soit force de proposition pour changer le monde!
            </p>
          </div>
        </Link>
        <Link className={styles.VoteEnd} to="demands/valid">
          <img className={styles.imgCards} src={valide} alt="Makesense.Logo" />
          <div className={styles.blocTitle}>
            <h2 className={styles.TitreHome}>
              <div className={styles.buttonSalmon} />
              Votes terminés
              <div className={styles.buttonSalmon} />
            </h2>
            <p className={styles.TexteHome}>
              Soit force de proposition pour changer le monde!
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
