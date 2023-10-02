import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styles from "./userCreation.module.scss";
import exitButtonImage from "../assets/bouttonExit.png";

export default function UserCreation({ toastOptions, closePopup }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Utilisateur crée avec succès !", toastOptions);
          closePopup();
        } else if (response.status === 403)
          toast.error("Cette utilisateur éxiste déjà", toastOptions);
        else
          throw new Error(
            "Un problème à eu lieu lors de la création de l'utilisateur"
          );
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  };

  return (
    <div className={styles.popupUser}>
      <div>
        <img
          aria-hidden
          src={exitButtonImage}
          alt="Exit"
          className={styles.closeButton}
          onClick={closePopup}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.recalibrage}>
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
              type="password"
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
      </form>
    </div>
  );
}

UserCreation.propTypes = {
  toastOptions: PropTypes.shape.isRequired,
  closePopup: PropTypes.func.isRequired,
};
