import styles from "./footer.module.scss";

function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <p className={styles.creators}>
          Développé par : <br />
          Amaury Clot - Alex Dubrulle-Fagnoni - Fabien Chabaud - Laëtitia Girbau
          - Thomas Denneulin
        </p>
      </div>
    </footer>
  );
}

export default Footer;
