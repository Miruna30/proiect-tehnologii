import { useEffect, useState } from "react";
import InterventieList from "./components/InterventieList.jsx";
import { formatNumar, numarCu } from "./format.js";
import { fetchInterventii } from "./api.js";

// Tema de pornire: cea aleasă anterior (pusă pe <html> de main.jsx) sau cea a sistemului
function temaInitiala() {
  const aleasa = document.documentElement.dataset.theme;
  if (aleasa === "dark" || aleasa === "light") return aleasa;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  // Datele vin de la server, deci lista pornește goală
  const [interventii, setInterventii] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false; // nu se setează state dacă pagina s-a închis între timp

    async function load() {
      try {
        const data = await fetchInterventii();
        if (!ignore) setInterventii(data);
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
  }, []);

  // În Etapa 6 modificările rămân locale: se pierd la refresh (rezolvat în Etapa 7)

  function handleToggle(id) {
    setInterventii((prev) =>
      prev.map((i) => (i.id === id ? { ...i, efectuata: !i.efectuata } : i))
    );
  }

  function handleDelete(id) {
    setInterventii((prev) => prev.filter((i) => i.id !== id));
  }

  // Comutarea temei: state-ul pentru buton, atributul data-theme pentru CSS
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
    try {
      localStorage.setItem("tema", noua); // opțional: alegerea rămâne după refresh
    } catch {
      // fără localStorage, tema se pierde la refresh; nu e o eroare
    }
  }

  // Valori derivate: se recalculează la fiecare randare, nu stau în state
  const programate = interventii.filter((i) => !i.efectuata).length;
  const cheltuieli = interventii
    .filter((i) => i.efectuata)
    .reduce((suma, i) => suma + i.cost, 0);

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>AutoJurnal</h1>
        <p>Istoricul și planificarea intervențiilor de service pentru mașinile tale.</p>
        <p className="app-count">
          {numarCu(interventii.length, "intervenție", "intervenții")}, dintre care{" "}
          {numarCu(programate, "programată", "programate")}
        </p>
        <p className="app-stats">Cheltuieli efectuate: {formatNumar(cheltuieli)} lei</p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Intervențiile mele</h2>
          {loading && <p className="info">Se încarcă intervențiile...</p>}
          {error && (
            <p className="error">
              Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
            </p>
          )}
          {!loading && !error && (
            <InterventieList
              interventii={interventii}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </>
  );
}
