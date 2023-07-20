import PropTypes from "prop-types";

export default function AlgoNote({ notesByDemand }) {
  const calculateAverageNote = () => {
    if (notesByDemand.length === 0) return 0;

    const totalNotes = notesByDemand.reduce((sum, note) => sum + note.Note, 0);
    const average = totalNotes / notesByDemand.length;

    return Math.round(average);
  };

  const averageNote = calculateAverageNote();

  return (
    <div>
      {notesByDemand.map((note) => (
        <div key={note.Id}>
          <p>Note: {note.Note}</p>
        </div>
      ))}
      <p>Moyenne des notes pour cette demande : {averageNote}</p>
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
