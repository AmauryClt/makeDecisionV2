import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { token, setToken, userId } = useAuth();
  const [usersData, setUsersData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUsersData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  console.info("usersData:", usersData);
  console.info("ID de l'utilisateur:", userId);
  console.info("token de cette connexion:", token);

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
        <Link className={styles.name} to="Profil">
          <div>Eliott LAREINE</div>
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
