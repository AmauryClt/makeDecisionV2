import PropTypes from "prop-types";

export default function AlgoNote({ notesByDemand }) {
  return (
    <div>
      {notesByDemand.map((note) => (
        <div key={note.Id}>
          <p>Note: {note.Note}</p>
        </div>
      ))}
      <p>ici c'est l'algo</p>
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
