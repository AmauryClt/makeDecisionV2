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
            <div className={styles.information}>
              <p className={styles.nom}>
                {user.Lastname} {user.Firstname}
              </p>
              <div className={styles.coordonnees}>
                <p className={styles.mobile}>
                  Num Mobile :{" "}
                  <span className={styles.entree}>{user.Numeromob}</span>
                </p>
                <p className={styles.fixe}>
                  Num Fixe :{" "}
                  <span className={styles.entree}>{user.Numerofix}</span>
                </p>
                <p className={styles.email}>
                  Email : <span className={styles.entree}>{user.Email}</span>
                </p>
              </div>
              <button className={styles.modifier} type="submit">
                Modifier les infos
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
