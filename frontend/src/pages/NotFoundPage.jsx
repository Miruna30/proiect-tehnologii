import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

// Prinde orice adresă care nu se potrivește cu rutele din App.jsx (path="*").
export default function NotFoundPage() {
  return (
    <section className={`panel ${styles.notFound}`} data-testid="not-found">
      <p className={styles.cod}>404</p>
      <h2>Pagina nu există</h2>
      <p className="info">Adresa cerută nu duce nicăieri. Poate ai greșit un caracter?</p>
      <Link to="/" className="btn">
        Înapoi la intervenții
      </Link>
    </section>
  );
}
