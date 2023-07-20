import React from "react";
import { useUser } from "../contexts/UserContext";
import styles from "./profil.module.scss";

export default function Profil() {
  const { user } = useUser();

  return (
    <main>
      {user === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <>
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
                <p className={styles.mobile2}>{user.Numeromob}</p>
                <p>
                  <button className={styles.Modifier} type="submit">
                    Modifier les infos
                  </button>
                </p>
              </div>
              <div className={styles.information}>
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
        </>
      )}
    </main>
  );
}
