import PropTypes from "prop-types";
import styles from "./AlgoNote.module.scss";
import AlgoStatut from "./AlgoStatut";

export default function AlgoNote({ notesByDemand, demandId }) {
  const calculateAverageNote = () => {
    if (notesByDemand.length === 0) return null;

    const totalNotes = notesByDemand.reduce((sum, note) => sum + note.Note, 0);
    const average = totalNotes / notesByDemand.length;

    return Math.round(average);
  };

  const calculateTotalNumberOfNotes = () => {
    return notesByDemand.length;
  };

  const totalNumberOfNotes = calculateTotalNumberOfNotes();

  const getNoteText = (averageNoteValue) => {
    if (averageNoteValue === null) {
      return "Pas d'appréciation moyenne pour le moment";
    }
    if (averageNoteValue <= 1) {
      return "Profond désaccord";
    }
    if (averageNoteValue <= 2) {
      return "Sceptique";
    }
    if (averageNoteValue <= 3) {
      return "Neutre";
    }
    if (averageNoteValue <= 4) {
      return "Accord";
    }
    return "Excellente";
  };

  const averageNote = calculateAverageNote();
  const averageNoteText = getNoteText(averageNote);

  return (
    <div>
      <h4 className={styles.h4Block5}>Statut de la demande :</h4>
      <AlgoStatut demandId={demandId} averageNote={averageNote} />
      <h4 className={styles.h4Block5}>Avancement des votes :</h4>
      {notesByDemand.map((note) => (
        <div key={note.Id} />
      ))}
      {totalNumberOfNotes === 0 ? (
        <h1 className={styles.h1title}>Soit le premier à voter !</h1>
      ) : (
        <>
          <div className={styles.d3}>Total des votes : </div>
          <h1 className={styles.h1title}> {totalNumberOfNotes}</h1>
          <div className={styles.d1}>Moyenne de la demande : </div>
          <h1 className={styles.h1title}> {averageNote}/5</h1>
          <div className={styles.d2}>Appréciation globale : </div>
          <h1 className={styles.h1title}> {averageNoteText}</h1>
        </>
      )}
    </div>
  );
}

AlgoNote.propTypes = {
  notesByDemand: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      Note: PropTypes.number.isRequired,
      UserId: PropTypes.number.isRequired,
      DemandId: PropTypes.number.isRequired,
    })
  ).isRequired,
  demandId: PropTypes.number.isRequired,
};
