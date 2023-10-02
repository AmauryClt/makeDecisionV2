import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styles from "./header.module.scss";
import Navbar from "./Navbar";
import { useUser } from "../contexts/UserContext";
import logo from "../assets/logo.png";

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
        <img className={styles.logo} src={logo} alt="make-sense" />
      </nav>
    );
  }

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    toast.success("A bientot", toastOptions);
  };

  return (
    <nav className={styles.headLinks}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="make-sense" />
      </Link>
      <div className={styles.liens}>
        <Navbar />
      </div>
      <div className={styles.rangement}>
        <Link className={styles.name} to="/Profil">
          {user && (
            <div>
              <h1 className={styles.nomProfil}>{user.Lastname}</h1>
              <h1 className={styles.nomProfil}>{user.Firstname}</h1>
            </div>
          )}
        </Link>
        {user == null ? (
          <Link to="/login">Login</Link>
        ) : (
          <button className={styles.btn} type="button" onClick={handleLogout}>
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
}

Header.propTypes = {
  toastOptions: PropTypes.func.isRequired,
};
