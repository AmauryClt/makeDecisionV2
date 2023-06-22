import styles from "./home.module.scss";

export default function Home() {
  return (
    <main className={styles.mainHome}>
      <div className={styles.creer} />
      <div className={styles.attente} />
      <div className={styles.désaccord} />
      <div className={styles.validée} />
      <div className={styles.enplace} />
      <div className={styles.archivée} />
    </main>
  );
}
