import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "./header.module.scss";
import Navbar from "./Navbar";
import { useUser } from "../contexts/UserContext";

export default function Header({ usersDatas }) {
  const { token, setToken } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, []);

  if (token == null) {
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
    setToken(null);
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
        <Link to="/Profil">
          <img className={styles.pp} src="./src/assets/test.jpg" alt="random" />
        </Link>
        <Link className={styles.name} to="/Profil">
          {usersDatas && (
            <div>{`${usersDatas.Firstname} ${usersDatas.Lastname}`}</div>
          )}
        </Link>
        {token == null ? (
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

Header.propTypes = {
  usersDatas: PropTypes.shape({
    Lastname: PropTypes.string.isRequired,
    Firstname: PropTypes.string.isRequired,
  }),
};

Header.defaultProps = {
  usersDatas: null,
};
