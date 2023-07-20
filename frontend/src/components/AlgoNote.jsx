import PropTypes from "prop-types";

export default function AlgoNote({ notesByDemand }) {
  const calculateAverageNote = () => {
    if (notesByDemand.length === 0) return "Soit le premier a voter !";

    const totalNotes = notesByDemand.reduce((sum, note) => sum + note.Note, 0);
    const average = totalNotes / notesByDemand.length;

    return Math.round(average);
  };

  // eslint-disable-next-line consistent-return
  const getNoteText = (averageNoteValue) => {
    if (typeof averageNoteValue === "string") {
      return "Pas d'appréciation moyenne";
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
        <div key={note.Id}>
          <p>Note: {note.Note}</p>
        </div>
      ))}
      <p>Moyenne des notes pour cette demande : {averageNote}</p>
      <p>Appréciation moyenne : {averageNoteText}</p>
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
