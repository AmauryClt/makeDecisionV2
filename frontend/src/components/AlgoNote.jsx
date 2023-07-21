import PropTypes from "prop-types";
import styles from "./AlgoNote.module.scss";

export default function AlgoNote({ notesByDemand }) {
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

  // eslint-disable-next-line consistent-return
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
    if (averageNoteValue <= 4.5) {
      return "Excellente";
    }
  };
  const averageNote = calculateAverageNote();
  const averageNoteText = getNoteText(averageNote);

  return (
    <div>
      {notesByDemand.map((note) => (
        <div key={note.Id} />
      ))}
      {totalNumberOfNotes === 0 ? (
        <h1>Soit le premier à voter !</h1>
      ) : (
        <>
          <div className={styles.d3}>Total des votes : </div>
          <h1> {totalNumberOfNotes}</h1>
          <div className={styles.d1}>Moyenne de la demande : </div>
          <h1> {averageNote}</h1>
          <div className={styles.d2}>Appréciation globale : </div>
          <h1> {averageNoteText}</h1>
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
};
