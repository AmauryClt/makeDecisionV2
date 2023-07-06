import React, { useState, useEffect } from "react";
import styles from "./profil.module.scss";

export default function profile() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/user")
      .then((response) => response.json())
      .then((data) => {
        const filteredUser = data.filter((user) => user.Id === 1);
        setUser(filteredUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <h1 className={styles.banniere}>Mon Profil</h1>
      <div className={styles.mainHome}>
        {users.map((user) => (
          <div key={user.Id}>
            <div className={styles.card}>
              <img
                className={styles.pp}
                src="./src/assets/test.jpg"
                alt="random"
              />
              <p className={styles.nom}>{user.Lastname}</p>
              <p className={styles.nom}>{user.Firstname}</p>
              <p className={styles.catégorie}>{user.Statut}</p>
              <p className={styles.mobile}>{user.Numeromob}</p>
              <p>
                <button className={styles.Modifier} type="submit">
                  Modifier les infos
                </button>
              </p>
            </div>
            <div className={styles.information}>
              <p className={styles.adresse}>
                Adresse :<p>{user.Adresse}</p>
                <span className={styles.rangements} />
              </p>
              <p className={styles.mobile}>
                Num Mobile :<p>{user.Numeromob}</p>
                <span className={styles.rangements} />
              </p>
              <p className={styles.fixe}>
                Num Fixe :<p>{user.Numerofix}</p>
                <span className={styles.rangements} />
              </p>
              <p className={styles.email}>
                Email :<p>{user.Email}</p>
                <span className={styles.rangements} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
