import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import PropTypes from "prop-types";
import styles from "./adminPage.module.scss";

export default function AdminPage() {
  const [allUSers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.info(allUSers);

  return (
    <main>
      <h1 className={styles.banniere}>Créer un utilisateur</h1>
      <div className={styles.mainHome}>
        {allUSers.map((allUser) => (
          <div className={styles.showUser} key={allUser.Id}>
            <div className={styles.blockFrontAllUser}>
              <h3>{allUser.username}</h3>
              <h3 className={styles.firstnameFrontAllUser}>
                {allUser.Firstname}
              </h3>
              <h3 className={styles.lastnameFrontAllUser}>
                {allUser.Lastname}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// AdminPage.propTypes = {
//   toastOptions: PropTypes.shape.isRequired,
// };
