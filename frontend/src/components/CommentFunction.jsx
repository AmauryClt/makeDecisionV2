import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";
import styles from "./commentFunction.module.scss";

export default function CommentFunction({ demand, toastOptions }) {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUser();
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${demand.Id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [demand.Id]);

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
    <>
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
      <div className={styles.zoneComment}>
        {comments.map((comment) => (
          <div key={comment.Id}>
            <div className={styles.authorComment}>
              <h5>
                {comment.Lastname} {comment.Firstname}
              </h5>
            </div>
            <p className={styles.contentComment}>{comment.Comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}

CommentFunction.propTypes = {
  demand: PropTypes.shape({
    Id: PropTypes.number.isRequired,
  }).isRequired,
};

CommentFunction.propTypes = {
  toastOptions: PropTypes.shape.isRequired,
};
