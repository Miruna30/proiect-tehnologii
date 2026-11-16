import { Link } from "react-router-dom";
import { ETICHETE_TIP } from "../constants.js";
import { formatData, formatNumar } from "../format.js";
import styles from "./InterventieCard.module.css";

// O singură intervenție. Titlul duce la pagina de detaliu; cardul nu modifică
// datele, doar anunță părintele prin onToggle și onDelete.
export default function InterventieCard({ interventie, onToggle, onDelete }) {
  return (
    <li
      className={interventie.efectuata ? `${styles.card} ${styles.done}` : styles.card}
      data-testid="item"
      data-id={interventie.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={interventie.efectuata}
          onChange={() => onToggle(interventie.id)}
          aria-label={`Marchează ${interventie.titlu} ca efectuată`}
          data-testid="item-toggle"
        />
        <div>
          <Link
            to={`/interventii/${interventie.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {interventie.titlu}
          </Link>
          <span className={`badge badge-${interventie.tip}`}>
            {ETICHETE_TIP[interventie.tip]}
          </span>
          <p className={styles.meta}>
            {interventie.masina} · {formatData(interventie.data)} ·{" "}
            {formatNumar(interventie.km)} km · {formatNumar(interventie.cost)} lei
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <span className={styles.status}>
          {interventie.efectuata ? "Efectuată" : "Programată"}
        </span>
        <button
          className="btn-danger"
          onClick={() => onDelete(interventie.id)}
          aria-label={`Șterge ${interventie.titlu}`}
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
