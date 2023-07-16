import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { token, setToken, userId } = useAuth();

  console.info("ID de l'utilisateur:", userId);

  return (
    <nav className={styles.headLinks}>
      <Link to="/">
        <img
          className={styles.logo}
          src="./src/assets/logo.png"
          alt="make-sense"
        />
      </Link>
      <div className={styles.Liens}>
        <Navbar />
      </div>
      <div className={styles.rangement}>
        <Link to="/Profil">
          <img className={styles.pp} src="./src/assets/test.jpg" alt="random" />
        </Link>
        <Link className={styles.name} to="Profil">
          <div>Eliott LAREINE</div>
        </Link>
        {token == null ? (
          <Link to="/login">Login</Link>
        ) : (
          <button type="button" onClick={() => setToken(null)}>
            Se déconnecter
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
