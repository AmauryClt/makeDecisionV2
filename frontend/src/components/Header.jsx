import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./header.module.scss";
import Navbar from "./Navbar";
import { useUser } from "../contexts/UserContext";

export default function Header() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, []);

  if (user == null) {
    return (
      <nav className={styles.headLinks}>
        <img
          className={styles.logo}
          src="./src/assets/logo.png"
          alt="make-sense"
        />
      </nav>
    );
  }

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

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
        <Link className={styles.name} to="/Profil">
          {user && (
            <div>
              <p>{user.Lastname}</p>
              <p>{user.Firstname}</p>
            </div>
          )}
        </Link>
        {user == null ? (
          <Link to="/login">Login</Link>
        ) : (
          <button type="button" onClick={handleLogout}>
            Se déconnecter
          </button>
        )}
      </div>
    </nav>
  );
}
