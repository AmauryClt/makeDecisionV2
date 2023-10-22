import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatISO, format, formatDistanceStrict, isBefore } from "date-fns";
import { fr } from "date-fns/locale";
import styles from "./deadlineFunction.module.scss";

export default function DeadlineFunction({ statut, demandId, deadline }) {
  const [currentStatut, setCurrentStatut] = useState(statut);

  const updateStatutOnDeadline = async (newStatut) => {
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

  useEffect(() => {
    console.warn("statut :", statut);
    console.warn("demandId :", demandId);
    console.warn("deadline :", deadline);

    const checkDeadline = () => {
      if (isBefore(new Date(), new Date(deadline))) {
        if (currentStatut === "EN DESACCORD") {
          const newStatut = "ARCHIVE";
          setCurrentStatut(newStatut);
          updateStatutOnDeadline(newStatut);
        } else if (currentStatut === "EN ATTENTE DE VOTE") {
          const newStatut = "VALIDE";
          setCurrentStatut(newStatut);
          updateStatutOnDeadline(newStatut);
        }
      }
    };

    const deadlineCheckInterval = setInterval(checkDeadline, 1000);

    return () => {
      clearInterval(deadlineCheckInterval);
    };
  }, [deadline, currentStatut]);

  const dateStr = deadline;
  const formattedDateISO = formatISO(new Date(dateStr), {
    representation: "date",
  });
  const formattedDate = format(new Date(formattedDateISO), "dd/MM/yyyy");

  const deadlinefinal = formatDistanceStrict(new Date(deadline), new Date(), {
    addSuffix: true,
    unit: "day",
    locale: fr,
  });

  return (
    <p className={styles.pBorder}>
      {formattedDate}
      <br />
      Fin des votes {deadlinefinal}
    </p>
  );
}

DeadlineFunction.propTypes = {
  statut: PropTypes.string.isRequired,
  demandId: PropTypes.number.isRequired,
  deadline: PropTypes.number.isRequired,
};
