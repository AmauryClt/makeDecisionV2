import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import styles from "./note.module.scss";

export default function Stars({ demand, notesByDemand }) {
  const { user } = useUser();
  const [rating, setRating] = useState(0);

  const handleSubmitNote = async () => {
    try {
      const response = await fetch("http://localhost:5000/note", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          DemandId: demand.Id,
          UserId: user,
          Note: rating,
        }),
      });

      const data = await response.json();
      console.info("Note envoyée avec succès :", data);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la note :", error.message);
    }
  };

  console.info("notes pour la demande", notesByDemand);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div>
      <Rating
        onClick={handleRating}
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
    })
  ).isRequired,
};
