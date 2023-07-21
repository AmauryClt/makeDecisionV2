import React from "react";
import { useForm } from "react-hook-form";
import styles from "./profil.module.scss";

export default function AdminPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.info("ce que j'envoi", data);

    fetch("http://localhost:5000/user", {
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
      <h1 className={styles.banniere}>Admin</h1>
      <div className={styles.mainHome}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username")}
            className={styles.title}
            type="text"
            name="username"
            placeholder="username"
            required
          />
          <input
            {...register("Firstname")}
            className={styles.title}
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
          <input
            {...register("Lastname")}
            className={styles.title}
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
          <input
            {...register("Email")}
            className={styles.title}
            type="text"
            name="Email"
            placeholder="Email"
            required
          />
          <input
            {...register("Numeromob")}
            className={styles.title}
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
          <input
            {...register("hashedPassword")}
            className={styles.title}
            type="text"
            name="hashedPassword"
            placeholder="hashedPassword"
            required
          />
          <div className={styles.super}>
            <button className={styles.Modifier} type="submit">
              Ajouter un utilisateur
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
