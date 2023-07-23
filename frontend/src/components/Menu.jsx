import { Link } from "react-router-dom";
import styles from "./menu.module.scss";

export default function Menu() {
  return (
    <main>
      <h1 className={styles.banniere}> Make A Desision</h1>
      <div className={styles.mainHome}>
        <Link className={styles.Creer} to="/demands/create">
          <img
            className={styles.imgCards}
            src="./src/assets/makesensecréer.jpg"
            alt="Makesense.Logo"
          />
          <h2 className={styles.TitreHome}>Créer ta décision</h2>
          <p className={styles.TexteHome}>
            Soit force de proposition pour changer le monde!
          </p>
        </Link>
        <Link className={styles.EnCours} to="demands/vote">
          <img
            className={styles.imgCards}
            src="./src/assets/encoursdevote.jpeg"
            alt="Makesense.Logo"
          />
          <h2 className={styles.TitreHome}>En cours de vote</h2>
          <p className={styles.TexteHome}>Vote pour changer le monde!</p>
        </Link>
        <Link className={styles.VoteEnd} to="demands/valid">
          <img
            className={styles.imgCards}
            src="./src/assets/makesensevalide.jpg"
            alt="Makesense.Logo"
          />
          <h2 className={styles.TitreHome}>Votes terminés</h2>
          <p className={styles.TexteHome}>Le monde va changer!</p>
        </Link>
      </div>
    </main>
  );
}
