import styles from "./footer.module.scss";
import { useUser } from "../contexts/UserContext";

function Footer() {
  const { user } = useUser();

  if (user == null) {
    return (
      <footer>
        <div className={styles.footer} />
      </footer>
    );
  }

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
