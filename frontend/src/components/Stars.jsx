import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";
import styles from "./stars.module.scss";

export default function Stars({
  demand,
  notesByDemand,
  toastOptions,
  triggerFetchNotes,
}) {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const userNote = notesByDemand.find((Note) => Note.UserId === user.Id);
    if (userNote) {
      setCurrentNote(userNote.Note);
    }
  }, [notesByDemand, user.Id]);

  const handleSubmitNote = async () => {
    if (rating === 0) {
      console.error("La note ne peut pas être null.");
      toast.error("Tu dois choisir une note pour voter ", toastOptions);
      return;
    }

    if (currentNote >= 1) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/note/${demand.Id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              Note: rating,
              UserId: user.Id,
              DemandId: demand.Id,
            }),
          }
        );

        if (response.status === 201) {
          const data = await response.json();
          console.info("Note mise à jour avec succès :", data);
          toast.success("Note mise à jour avec succès", toastOptions);

          triggerFetchNotes();
        } else if (response.status === 403) {
          toast.error("Impossible de modifier cette demande", toastOptions);
        } else {
          throw new Error(
            "Un problème à eu lieu lors de la mise à jour de la note"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de la note :",
          error.message
        );
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/note`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              DemandId: demand.Id,
              UserId: user.Id,
              Note: rating,
            }),
          }
        );

        if (response.status === 201) {
          const data = await response.json();
          console.info("Note enregistré avec succès :", data);
          toast.success("Note enregistré avec succès", toastOptions);

          triggerFetchNotes();
        } else if (response.status === 403) {
          toast.error("Impossible de modifier cette demande", toastOptions);
        } else {
          throw new Error(
            "Un problème à eu lieu lors de l'enregistrement de la note"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'enregistrement de la note :",
          error.message
        );
      }
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className={styles.centerContainer}>
      <Rating
        className={styles.starsSystem}
        onClick={handleRating}
        initialValue={currentNote ?? rating}
        ratingValue={rating}
        transition
        showTooltip
        tooltipArray={[
          "Profond désaccord",
          "Sceptique",
          "Neutre",
          "Accord",
          "Excellente",
        ]}
        fillColorArray={["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"]}
        titleSeparator="sur"
      />

      <button
        type="button"
        className={styles.voterButton}
        onClick={handleSubmitNote}
      >
        VOTER !
      </button>
    </div>
  );
}

Stars.propTypes = {
  demand: PropTypes.shape({
    Id: PropTypes.number.isRequired,
  }).isRequired,
  notesByDemand: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      UserId: PropTypes.number.isRequired,
      Note: PropTypes.number.isRequired,
    })
  ).isRequired,
};

Stars.propTypes = {
  toastOptions: PropTypes.shape.isRequired,
  triggerFetchNotes: PropTypes.func.isRequired,
};
