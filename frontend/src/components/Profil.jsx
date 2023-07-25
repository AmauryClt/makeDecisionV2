import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import styles from "./profil.module.scss";

export default function Profil() {
  const { user } = useUser();

  return (
    <main>
      <h1 className={styles.banniere}>Mon Profil</h1>
      <div className={styles.mainHome}>
        <div className={styles.element}>
          <div className={styles.information}>
            <p className={styles.nom}>{user.Lastname}</p>
            <p className={styles.nom}>{user.Firstname}</p>
            <ul className={styles.mobile}>
              Num Mobile :<li>{user.Numeromob}</li>
            </ul>
            <ul className={styles.fixe}>
              Num Fixe :<li>{user.Numerofix}</li>
            </ul>
            <ul className={styles.email}>
              Email :<li>{user.Email}</li>
            </ul>
            {user.Admin === 1 && (
              <div className={styles.button}>
                <Link className={styles.Modifier} to="/Admin">
                  Accès à la page admin
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
