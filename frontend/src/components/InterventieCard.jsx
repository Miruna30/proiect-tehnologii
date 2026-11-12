import { formatData, formatNumar } from "../format.js";

// Textele afișate pentru valorile din date (în date rămân fără diacritice)
const ETICHETE_TIP = {
  revizie: "Revizie",
  reparatie: "Reparație",
  diagnoza: "Diagnoză",
  inspectie: "Inspecție",
};

// O singură intervenție. Cardul nu modifică datele: doar anunță părintele
// prin onToggle și onDelete ce a făcut utilizatorul.
export default function InterventieCard({ interventie, onToggle, onDelete }) {
  return (
    <li
      className={interventie.efectuata ? "interventie-card done" : "interventie-card"}
      data-testid="item"
      data-id={interventie.id}
    >
      <label className="interventie-main">
        <input
          type="checkbox"
          checked={interventie.efectuata}
          onChange={() => onToggle(interventie.id)}
          data-testid="item-toggle"
        />
        <div>
          <h3 data-testid="item-title">{interventie.titlu}</h3>
          <span className={`badge badge-${interventie.tip}`}>
            {ETICHETE_TIP[interventie.tip]}
          </span>
          <p className="meta">
            {interventie.masina} · {formatData(interventie.data)} ·{" "}
            {formatNumar(interventie.km)} km · {formatNumar(interventie.cost)} lei
          </p>
        </div>
      </label>

      <div className="card-actions">
        <span className="status">
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
