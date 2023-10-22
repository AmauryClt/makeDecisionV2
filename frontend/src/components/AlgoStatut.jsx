import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./algoStatut.module.scss";

export default function AlgoStatut({ demandId, averageNote }) {
  const [statut, setStatut] = useState(null);

  const updateStatutOnServer = async (newStatut) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/demands/statut/${demandId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Statut: newStatut }),
        }
      );

      if (response.status === 201) {
        console.info("Statut mis à jour avec succès.");
      } else {
        console.error("Erreur lors de la mise à jour du statut.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  const updateStatutBasedOnAverageNote = (newAverageNote) => {
    if (newAverageNote < 3) {
      const newStatut = "EN DESACCORD";
      setStatut(newStatut);
      updateStatutOnServer(newStatut);
    } else if (newAverageNote > 3) {
      const newStatut = "EN ATTENTE DE VOTE";
      setStatut(newStatut);
      updateStatutOnServer(newStatut);
    }
  };

  useEffect(() => {
    const fetchStatut = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/demands/get/statut/${demandId}`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setStatut(data.Statut);
        } else if (response.status === 404) {
          setStatut("Demande non trouvée");
        } else {
          setStatut("Erreur lors de la récupération du statut");
        }
      } catch (error) {
        console.error(error);
        setStatut("Erreur lors de la récupération du statut");
      }
    };

    fetchStatut();
  }, [demandId]);

  useEffect(() => {
    updateStatutBasedOnAverageNote(averageNote);
  }, [averageNote]);

  return (
    <div>
      <p className={styles.pBorder}>{statut}</p>
    </div>
  );
}

AlgoStatut.propTypes = {
  demandId: PropTypes.number.isRequired,
  averageNote: PropTypes.number.isRequired,
};
