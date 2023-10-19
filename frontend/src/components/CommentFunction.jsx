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
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

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

  const fetchPutComment = async (commentToEdit) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/update/${
          commentToEdit.Id
        }`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            Comment: editedComment,
            DemandId: demand.Id,
            UserId: commentToEdit.UserId,
          }),
        }
      );

      if (response.status === 201) {
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

    setEditCommentId(null);
    setEditedComment("");
  };

  const deleteCommentbutton = async (commentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/delete/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 201) {
        fetchComments();
        console.info("Le commentaire a été supprimé avec succès");
      } else if (response.status === 403) {
        toast.error("Impossible de supprimer ce commentaire", toastOptions);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };

  const startEditingComment = (commentId) => {
    setEditCommentId(commentId);
    const commentToEdit = comments.find((comment) => comment.Id === commentId);
    setEditedComment(commentToEdit.Comment);
  };

  const saveEditedComment = async (commentToEdit) => {
    try {
      await fetchPutComment(commentToEdit);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du message :",
        error.message
      );
    }

    setEditCommentId(null);
    setEditedComment("");
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
            {editCommentId === comment.Id ? (
              <div>
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <input type="hidden" name="UserId" value={comment.UserId} />
                <button
                  type="button"
                  onClick={() => saveEditedComment(comment)}
                >
                  Save
                </button>
              </div>
            ) : (
              <p className={styles.contentComment}>{comment.Comment}</p>
            )}
            {user.Id === comment.UserId && (
              <div>
                {editCommentId !== comment.Id && (
                  <button
                    type="button"
                    onClick={() => startEditingComment(comment.Id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => deleteCommentbutton(comment.Id)}
                >
                  Delete
                </button>
              </div>
            )}
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
