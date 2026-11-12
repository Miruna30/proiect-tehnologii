import InterventieCard from "./InterventieCard.jsx";

// Primește lista și funcțiile și le transmite fiecărui card.
export default function InterventieList({ interventii, onToggle, onDelete }) {
  // Return timpuriu: lista goală are mesajul ei
  if (interventii.length === 0) {
    return <p className="empty">Nu există nicio intervenție.</p>;
  }

  return (
    <ul className="interventie-list">
      {interventii.map((interventie) => (
        <InterventieCard
          key={interventie.id}
          interventie={interventie}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
