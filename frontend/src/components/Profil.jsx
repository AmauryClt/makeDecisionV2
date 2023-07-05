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
          <p className={styles.adresse}>Adresse</p>
          <p className={styles.mobile}>Num Mobile</p>
          <p className={styles.fixe}>Num Fixe</p>
          <p className={styles.nom}>BlaBla</p>
        </div>
      </div>
    </main>
  );
}
