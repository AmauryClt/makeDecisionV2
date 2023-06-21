import styles from "./home.module.scss";

export default function Home() {
  return (
    <main>
      <h1 className={styles.banniere}> Make Desicion</h1>
      <div className={styles.mainHome}>
        <div className={styles.Creer}>
          <img
            className={styles.imgCards}
            src="./src/assets/makesensecreer.jpg"
            alt="Makesense.Logo"
          />
          <h2>Créer ta décision</h2>
          <p>Coucou</p>
        </div>
        <div className={styles.EnCours}>
          <img
            className={styles.imgCards}
            src="./src/assets/encoursdevote.jpeg"
            alt="Makesense.Logo"
          />
          <h2>En cours de vote</h2>
          <p>Coucou</p>
        </div>
        <div className={styles.VoteEnd}>
          <img
            className={styles.imgCards}
            src="./src/assets/makesensevalide.jpg"
            alt="Makesense.Logo"
          />
          <h2>Votation terminé</h2>
          <p>Coucou</p>
        </div>
      </div>
    </main>
  );
}
