import React from "react";
import { useForm } from "react-hook-form";
import styles from "./adminPage.module.scss";

export default function AdminPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.info("ce que j'envoi", data);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.info(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      <h1 className={styles.banniere}>Créer un utilisateur</h1>
      <div className={styles.mainHome}>
        <div className={styles.recalibrage} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.personne}>
            <p className={styles.texte}>Nom d'utilisateur :</p>
            <input
              {...register("username")}
              className={styles.champs}
              type="text"
              name="username"
              placeholder="username"
              required
            />
            <p className={styles.texte}>Prénom :</p>
            <input
              {...register("Firstname")}
              className={styles.champs}
              type="text"
              name="Firstname"
              placeholder="Firstname"
              required
              onKeyPress={(event) => {
                const allowedCharacters = /^[^0-9]*$/;
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <p className={styles.texte}>Nom de famille :</p>
            <input
              {...register("Lastname")}
              className={styles.champs}
              type="text"
              name="Lastname"
              placeholder="Lastname"
              required
              onKeyPress={(event) => {
                const allowedCharacters = /^[^0-9]*$/;
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <div className={styles.donnée}>
            <p className={styles.texte}>Adresse Email :</p>
            <input
              {...register("Email")}
              className={styles.champs}
              type="text"
              name="Email"
              placeholder="Email"
              required
            />
            <p className={styles.texte}>Numéro Mobile :</p>
            <input
              {...register("Numeromob")}
              className={styles.champs}
              type="number"
              name="Numeromob"
              placeholder="Numeromob"
              required
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(event) => {
                let { value } = event.target;
                const sanitizedValue = value.replace(/[^0-9]/g, "");
                if (sanitizedValue.length > 10) {
                  value = sanitizedValue.slice(0, 10);
                } else {
                  value = sanitizedValue;
                }
                event.target.value = value;
              }}
            />
            <p className={styles.texte}>Mot de passe :</p>
            <input
              {...register("password")}
              className={styles.champs}
              type="text"
              name="password"
              placeholder="hashedPassword"
              required
            />
          </div>
        </div>
        <div className={styles.btnsubmit}>
          <button className={styles.Modifier} type="submit">
            Ajouter un utilisateur
          </button>
        </div>
      </div>
    </main>
  );
}
