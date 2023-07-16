import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";
import styles from "./profil.module.scss";

export default function Profil({ usersDatas }) {
  const { token, userId } = useAuth();

  console.info("ID de l'utilisateur:", userId);
  console.info("token de cette connexion:", token);
  console.info("information de l'utilisateur:", usersDatas);

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
            <p className={styles.nom}>{usersDatas.Lastname}</p>
            <p className={styles.nom}>{usersDatas.Firstname}</p>
            <p className={styles.mobile2}>{usersDatas.Numeromob}</p>
            <p>
              <button className={styles.Modifier} type="submit">
                Modifier les infos
              </button>
            </p>
          </div>
          <div className={styles.information}>
            <ul className={styles.mobile}>
              Num Mobile :<li>{usersDatas.Numeromob}</li>
            </ul>
            <ul className={styles.fixe}>
              Num Fixe :<li>{usersDatas.Numerofix}</li>
            </ul>
            <ul className={styles.email}>
              Email :<li>{usersDatas.Email}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

Profil.propTypes = {
  usersDatas: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Lastname: PropTypes.string.isRequired,
    Firstname: PropTypes.string.isRequired,
    Statut: PropTypes.string.isRequired,
    Numeromob: PropTypes.string.isRequired,
    Numerofix: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};

Profil.defaultProps = {
  usersDatas: null,
};
