import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styles from "./header.module.scss";
import Navbar from "./Navbar";
import { useUser } from "../contexts/UserContext";

export default function Header({ toastOptions }) {
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
    toast.success("👋 A bientot 👋", toastOptions);
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
              <h1>{user.Lastname}</h1>
              <h1>{user.Firstname}</h1>
            </div>
          )}
        </Link>
        {user == null ? (
          <Link to="/login">Login</Link>
        ) : (
          <button className={styles.btn} type="button" onClick={handleLogout}>
            déconnexion
          </button>
        )}
      </div>
    </nav>
  );
}

Header.propTypes = {
  toastOptions: PropTypes.shape.isRequired,
};
