import { Link } from "react-router-dom";
import styles from "./DesprePage.module.css";

// Pagina de prezentare a aplicației (textul din README).
export default function DesprePage() {
  return (
    <section className={`panel ${styles.despre}`}>
      <h2>Despre AutoJurnal</h2>
      <p className={styles.lead}>
        AutoJurnal ține evidența tuturor intervențiilor de service ale mașinilor tale:
        ce s-a făcut, ce urmează și cât a costat.
      </p>

      <ul className={styles.puncte}>
        <li>
          <strong>Istoric complet.</strong> Revizii, reparații, diagnoze și inspecții, cu
          data, kilometrajul și costul fiecăreia.
        </li>
        <li>
          <strong>Planificare.</strong> O intervenție poate fi programată pentru o dată
          viitoare și bifată când s-a efectuat.
        </li>
        <li>
          <strong>Mai multe mașini.</strong> Lista se filtrează pe mașină, iar pagina
          fiecărei intervenții arată istoricul mașinii și suma cheltuită pe ea.
        </li>
      </ul>

      <p className={styles.stack}>
        Proiect de semestru la Tehnologii Web, construit pas cu pas. Stack: React, Vite,
        React Router, CSS Modules, json-server (urmează Node.js, Express și o bază de date).
      </p>

      <Link to="/" className="btn">
        Vezi intervențiile
      </Link>
    </section>
  );
}
