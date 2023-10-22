import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import styles from "./commentPostFunction.module.scss";

export default function CommentForm({ demand, toastOptions, fetchComments }) {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comments`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            DemandId: demand.Id,
            UserId: user.Id,
          }),
        }
      );

      if (response.status === 201) {
        toast.success("Commentaire enregistré avec succès", toastOptions);
        reset();
        fetchComments();
        console.info("Le commentaire a été enregistré avec succès");
      } else if (response.status === 403) {
        toast.error(
          "Impossible de laisser un commentaire sur cette demande",
          toastOptions
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du message :",
        error.message
      );
    }
  };

  return (
    <form className={styles.commentPost} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className={styles.writeComment}
        {...register("Comment")}
        type="text"
        name="Comment"
        placeholder="Donne ton avis sur cette décision à prendre"
        required
      />
      <button className={styles.commentButton} type="submit">
        Submit
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  demand: PropTypes.shape({
    Id: PropTypes.number.isRequired,
  }).isRequired,
  toastOptions: PropTypes.shape.isRequired,
  fetchComments: PropTypes.func.isRequired,
};
