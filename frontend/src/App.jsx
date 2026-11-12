import { useState } from "react";
import InterventieList from "./components/InterventieList.jsx";
import { formatNumar, numarCu } from "./format.js";

// Datele de test din README (doar valoarea inițială a state-ului)
const INTERVENTII_INITIALE = [
  {
    id: 1,
    titlu: "Schimb ulei și filtre",
    efectuata: false,
    tip: "revizie",
    masina: "VW Golf 7 · B 77 MRP",
    data: "2026-12-05",
    km: 152000,
    cost: 650,
  },
  {
    id: 2,
    titlu: "Înlocuire plăcuțe frână față",
    efectuata: true,
    tip: "reparatie",
    masina: "VW Golf 7 · B 77 MRP",
    data: "2026-10-14",
    km: 149800,
    cost: 420,
  },
  {
    id: 3,
    titlu: "Inspecție tehnică periodică (ITP)",
    efectuata: false,
    tip: "inspectie",
    masina: "Dacia Logan · IF 12 ABC",
    data: "2027-01-20",
    km: 98000,
    cost: 180,
  },
];

// Tema de pornire: cea aleasă anterior (pusă pe <html> de main.jsx) sau cea a sistemului
function temaInitiala() {
  const aleasa = document.documentElement.dataset.theme;
  if (aleasa === "dark" || aleasa === "light") return aleasa;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [interventii, setInterventii] = useState(INTERVENTII_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  // Actualizare imutabilă: listă nouă, obiect nou pentru elementul schimbat
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
          <InterventieList
            interventii={interventii}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
}
