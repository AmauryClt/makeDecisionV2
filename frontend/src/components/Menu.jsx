import { Link } from "react-router-dom";
import styles from "./menu.module.scss";
import { useAuth } from "../contexts/AuthContext";

export default function Menu() {
  const { token, userId } = useAuth();

  console.info("ID de l'utilisateur:", userId);
  console.info("token de cette connection:", token);

  return (
    <main>
      <h1 className={styles.banniere}> Make Desicion</h1>
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
          <p className={styles.TexteHome}>
            Soit force de proposition pour changer le monde!
          </p>
        </Link>
        <Link className={styles.VoteEnd} to="demands/valid">
          <img
            className={styles.imgCards}
            src="./src/assets/makesensevalide.jpg"
            alt="Makesense.Logo"
          />
          <h2 className={styles.TitreHome}>Votation terminé</h2>
          <p className={styles.TexteHome}>
            Soit force de proposition pour changer le monde!
          </p>
        </Link>
      </div>
    </main>
  );
}
