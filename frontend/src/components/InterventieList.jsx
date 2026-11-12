import InterventieCard from "./InterventieCard.jsx";

// Primește toată lista și desenează câte un card pentru fiecare intervenție.
export default function InterventieList({ interventii }) {
  // Return timpuriu: lista goală are mesajul ei
  if (interventii.length === 0) {
    return <p className="empty">Nu există nicio intervenție.</p>;
  }

  return (
    <ul className="interventie-list">
      {interventii.map((interventie) => (
        <InterventieCard key={interventie.id} interventie={interventie} />
      ))}
    </ul>
  );
}
