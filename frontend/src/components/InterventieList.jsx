import InterventieCard from "./InterventieCard.jsx";
import styles from "./InterventieList.module.css";

// Primește lista și funcțiile și le transmite fiecărui card.
export default function InterventieList({ interventii, onToggle, onDelete }) {
  // Return timpuriu: lista goală are mesajul ei
  if (interventii.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        Nu există nicio intervenție.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
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
