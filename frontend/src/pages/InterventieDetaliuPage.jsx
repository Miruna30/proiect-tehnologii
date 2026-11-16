import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchInterventie, fetchInterventiiMasina } from "../api.js";
import { ETICHETE_TIP } from "../constants.js";
import { formatData, formatNumar, numarCu, textZile, zilePanaLa } from "../format.js";
import styles from "./InterventieDetaliuPage.module.css";

// Pagina unei singure intervenții, la adresa /interventii/:id.
// Pe lângă câmpurile din card arată cât timp a trecut (sau mai e) până la ea
// și istoricul complet al mașinii, cu suma cheltuită pe ea.
export default function InterventieDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [interventie, setInterventie] = useState(null);
  const [istoric, setIstoric] = useState([]); // toate intervențiile aceleiași mașini
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reîncarcă dacă se schimbă id-ul din adresă (de exemplu, la un click în istoric)
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchInterventie(id);
        if (ignore) return;
        setInterventie(data);
        setError(null); // o eroare de la un id anterior nu mai este valabilă

        // A doua cerere depinde de prima: are nevoie de mașina intervenției.
        // Dacă eșuează, pagina rămâne utilizabilă, doar fără istoric.
        try {
          const aceeasiMasina = await fetchInterventiiMasina(data.masina);
          if (!ignore) setIstoric(aceeasiMasina.filter((i) => i.masina === data.masina));
        } catch {
          if (!ignore) setIstoric([]);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă intervenția...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" role="alert" data-testid="error">
          Intervenția nu a putut fi încărcată: {error}
        </p>
        <Link to="/">Înapoi la intervenții</Link>
      </section>
    );
  }

  // Valori derivate pentru afișare
  const zile = zilePanaLa(interventie.data);
  const cronologic = [...istoric].sort((a, b) => b.data.localeCompare(a.data));
  const cheltuitMasina = istoric
    .filter((i) => i.efectuata)
    .reduce((suma, i) => suma + i.cost, 0);

  return (
    <div className={styles.layout}>
      <section className={`panel ${styles.detail}`} data-testid="detail">
        <Link to="/" className={styles.back}>
          ← Înapoi la intervenții
        </Link>

        <h2
          className={interventie.efectuata ? `${styles.title} ${styles.done}` : styles.title}
          data-testid="detail-title"
        >
          {interventie.titlu}
        </h2>

        <div className={styles.tags}>
          <span className={`badge badge-${interventie.tip}`}>
            {ETICHETE_TIP[interventie.tip]}
          </span>
          <span className={interventie.efectuata ? `${styles.stare} ${styles.efectuata}` : styles.stare}>
            {interventie.efectuata ? "Efectuată" : "Programată"}
          </span>
          <span className={styles.cand}>{textZile(zile)}</span>
        </div>

        <dl className={styles.fields}>
          <dt>Mașina</dt>
          <dd>{interventie.masina}</dd>
          <dt>Data</dt>
          <dd>{formatData(interventie.data)}</dd>
          <dt>Kilometraj</dt>
          <dd>{formatNumar(interventie.km)} km</dd>
          <dt>Cost</dt>
          <dd>{formatNumar(interventie.cost)} lei</dd>
          <dt>ID</dt>
          <dd>{interventie.id}</dd>
        </dl>
      </section>

      <section className="panel">
        <h2>Istoricul mașinii</h2>
        <p className={styles.rezumat}>
          {numarCu(istoric.length, "intervenție", "intervenții")} pentru{" "}
          <strong>{interventie.masina}</strong> · cheltuit:{" "}
          <strong>{formatNumar(cheltuitMasina)} lei</strong>
        </p>

        <ol className={styles.timeline}>
          {cronologic.map((i) => (
            <li
              key={i.id}
              className={i.id === interventie.id ? `${styles.pas} ${styles.curent}` : styles.pas}
            >
              <span className={styles.pasData}>{formatData(i.data)}</span>
              {i.id === interventie.id ? (
                <span className={styles.pasTitlu}>Această intervenție</span>
              ) : (
                <Link to={`/interventii/${i.id}`} className={styles.pasTitlu}>
                  {i.titlu}
                </Link>
              )}
              <span className={styles.pasMeta}>
                {formatNumar(i.km)} km · {i.efectuata ? "efectuată" : "programată"}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
