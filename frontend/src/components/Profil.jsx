import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";
import styles from "./profil.module.scss";

export default function Profil({ usersData }) {
  const { token, userId } = useAuth();

  console.info("ID de l'utilisateur:", userId);
  console.info("token de cette connexion:", token);

  if (!usersData || usersData.length === 0) {
    return (
      <main>
        <h1 className={styles.banniere}>Mon Profil</h1>
        <p>Loading...</p>
      </main>
    );
  }

  const user = usersData[0];

  return (
    <main>
      <h1 className={styles.banniere}>Mon Profil</h1>
      <div className={styles.mainHome}>
        <div className={styles.element}>
          <div className={styles.card}>
            <img
              className={styles.pp}
              src="./src/assets/test.jpg"
              alt="random"
            />
            <p className={styles.nom}>{user.Lastname}</p>
            <p className={styles.nom}>{user.Firstname}</p>
            <p className={styles.catégorie}>{user.Statut}</p>
            <p className={styles.mobile2}>{user.Numeromob}</p>
            <p>
              <button className={styles.Modifier} type="submit">
                Modifier les infos
              </button>
            </p>
          </div>
          <div className={styles.information}>
            <ul className={styles.adresse}>
              Adresse :<li>{user.Adresse}</li>
            </ul>
            <ul className={styles.mobile}>
              Num Mobile :<li>{user.Numeromob}</li>
            </ul>
            <ul className={styles.fixe}>
              Num Fixe :<li>{user.Numerofix}</li>
            </ul>
            <ul className={styles.email}>
              Email :<li>{user.Email}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

Profil.propTypes = {
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      Lastname: PropTypes.string.isRequired,
      Firstname: PropTypes.string.isRequired,
      Statut: PropTypes.string.isRequired,
      Numeromob: PropTypes.string.isRequired,
      Adresse: PropTypes.string.isRequired,
      Numerofix: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
    })
  ),
};

// Ajoutez la règle ESLint pour éviter l'erreur sur defaultProps
// eslint-disable-next-line react/default-props-match-prop-types
Profil.defaultProps = {
  usersData: [],
};
