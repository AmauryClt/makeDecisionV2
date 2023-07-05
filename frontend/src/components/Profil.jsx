import styles from "./profil.module.scss";

export default function profile() {
  return (
    <main>
      <h1 className={styles.banniere}>Mon Profil</h1>
      <div className={styles.mainHome}>
        <div className={styles.card}>
          <img className={styles.pp} src="./src/assets/test.jpg" alt="random" />
          <p className={styles.nom}>Eliott LAREINE</p>
          <p className={styles.catégorie}>Juriste</p>
          <p className={styles.adress}>124 Rue Victor Hugo</p>
          <p>
            <button className={styles.Modifier} type="submit">
              Modifier les infos
            </button>
          </p>
        </div>
        <div className={styles.information}>
          <p className={styles.adresse}>
            Adresse :
            <span className={styles.rangements}>
              157 Avenue Victor Hugo Le Grand Chapitôt
            </span>
          </p>
          <p className={styles.mobile}>
            Num Mobile :
            <span className={styles.rangements}>06 78 45 58 23</span>
          </p>
          <p className={styles.fixe}>
            Num Fixe :<span className={styles.rangements}>04 45 85 25 93</span>
          </p>
          <p className={styles.email}>
            Email :
            <span className={styles.rangements}>
              Eliott.naimepasfaker@gmail.com
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
