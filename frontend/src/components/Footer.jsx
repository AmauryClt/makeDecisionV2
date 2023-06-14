import styles from "./footer.module.scss";

function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <p className={styles.creators}>
          Dévellopé par : Amaury Clot - Thomas Denneulin - Fabien Chabaud - Alex
          Dubrulle-Fagnoni - Laëtitia Girbau
        </p>
      </div>
    </footer>
  );
}

export default Footer;
