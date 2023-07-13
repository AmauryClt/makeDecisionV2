import React, { useState, useEffect } from "react";
import styles from "./profil.module.scss";

export default function profile() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user`)
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
          <div className={styles.element} key={user.Id}>
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
        ))}
      </div>
    </main>
  );
}
