import { formatData, formatNumar } from "../format.js";

// Textele afișate pentru valorile din date (în date rămân fără diacritice)
const ETICHETE_TIP = {
  revizie: "Revizie",
  reparatie: "Reparație",
  diagnoza: "Diagnoză",
  inspectie: "Inspecție",
};

// O singură intervenție, primită prin props.
export default function InterventieCard({ interventie }) {
  return (
    <li className={interventie.efectuata ? "interventie-card done" : "interventie-card"}>
      <div>
        <h3>{interventie.titlu}</h3>
        <span className={`badge badge-${interventie.tip}`}>
          {ETICHETE_TIP[interventie.tip]}
        </span>
        <p className="meta">
          {interventie.masina} · {formatData(interventie.data)} ·{" "}
          {formatNumar(interventie.km)} km · {formatNumar(interventie.cost)} lei
        </p>
      </div>
      <span className="status">
        {interventie.efectuata ? "Efectuată" : "Programată"}
      </span>
    </li>
  );
}
