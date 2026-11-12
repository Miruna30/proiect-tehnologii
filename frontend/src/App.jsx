import { useEffect, useState } from "react";
import InterventieList from "./components/InterventieList.jsx";
import InterventieForm from "./components/InterventieForm.jsx";
import Filtre from "./components/Filtre.jsx";
import { formatData, formatNumar, numarCu } from "./format.js";
import {
  createInterventie,
  deleteInterventie,
  fetchInterventii,
  updateInterventie,
} from "./api.js";

// Tema de pornire: cea aleasă anterior (pusă pe <html> de main.jsx) sau cea a sistemului
function temaInitiala() {
  const aleasa = document.documentElement.dataset.theme;
  if (aleasa === "dark" || aleasa === "light") return aleasa;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [interventii, setInterventii] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Filtrele listei (doar afișare; datele de pe server nu se schimbă)
  const [filtruStare, setFiltruStare] = useState("toate");
  const [filtruMasina, setFiltruMasina] = useState("");
  const [cautare, setCautare] = useState("");

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false; // nu se setează state dacă pagina s-a închis între timp

    async function load() {
      try {
        const data = await fetchInterventii();
        if (!ignore) setInterventii(data);
      } catch (err) {
        if (!ignore) setError(`Nu am putut încărca datele: ${err.message}. Rulează npm run api?`);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat.
  // Eroarea nu se prinde aici: ajunge în formular, care o afișează.
  async function handleAdd(interventie) {
    const creata = await createInterventie(interventie); // serverul întoarce elementul cu id
    setInterventii((prev) => [...prev, creata]);
  }

  async function handleToggle(id) {
    const interventie = interventii.find((i) => i.id === id);
    try {
      const actualizata = await updateInterventie(id, { efectuata: !interventie.efectuata });
      setInterventii((prev) => prev.map((i) => (i.id === id ? actualizata : i)));
      setError(null);
    } catch (err) {
      setError(`Nu am putut salva modificarea: ${err.message}`);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteInterventie(id);
      setInterventii((prev) => prev.filter((i) => i.id !== id));
      setError(null);
    } catch (err) {
      setError(`Nu am putut șterge intervenția: ${err.message}`);
    }
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

  // --- Valori derivate: se recalculează la fiecare randare, nu stau în state ---

  const programate = interventii.filter((i) => !i.efectuata);
  const cheltuieli = interventii
    .filter((i) => i.efectuata)
    .reduce((suma, i) => suma + i.cost, 0);

  // Următoarea programare: intervenția programată cu data cea mai apropiată.
  // (Titlul nu se repetă în antet, ca să apară o singură dată în pagină.)
  const urmatoarea = programate.reduce(
    (prima, i) => (prima === null || i.data < prima.data ? i : prima),
    null
  );

  // Mașinile distincte, pentru filtru și pentru sugestiile din formular
  const masini = [...new Set(interventii.map((i) => i.masina))].sort();

  // Lista afișată: toate filtrele aplicate pe rând
  const text = cautare.trim().toLowerCase();
  const filtrate = interventii
    .filter((i) =>
      filtruStare === "toate" ? true : filtruStare === "efectuate" ? i.efectuata : !i.efectuata
    )
    .filter((i) => filtruMasina === "" || i.masina === filtruMasina)
    .filter((i) => i.titlu.toLowerCase().includes(text));

  const filtruActiv = filtruStare !== "toate" || filtruMasina !== "" || text !== "";

  return (
    <>
      <header className="app-header">
        <button className="theme-toggle" onClick={handleTema} aria-pressed={tema === "dark"}>
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>AutoJurnal</h1>
        <p>Istoricul și planificarea intervențiilor de service pentru mașinile tale.</p>
        <p className="app-count">
          {numarCu(interventii.length, "intervenție", "intervenții")}, dintre care{" "}
          {numarCu(programate.length, "programată", "programate")}
        </p>
        <p className="app-stats">
          Cheltuieli efectuate: {formatNumar(cheltuieli)} lei
          {urmatoarea && (
            <>
              {" "}· Următoarea programare: {formatData(urmatoarea.data)}, {urmatoarea.masina}
            </>
          )}
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Adaugă intervenție</h2>
          <InterventieForm onAdd={handleAdd} masini={masini} />
        </section>

        <section className="panel">
          <h2>Intervențiile mele</h2>

          {loading && (
            <p className="info" data-testid="loading">
              Se încarcă intervențiile...
            </p>
          )}
          {error && (
            <p className="error" role="alert" data-testid="error">
              {error}
            </p>
          )}

          {!loading && interventii.length > 0 && (
            <Filtre
              stare={filtruStare}
              onStare={setFiltruStare}
              masina={filtruMasina}
              onMasina={setFiltruMasina}
              masini={masini}
              cautare={cautare}
              onCautare={setCautare}
            />
          )}

          {!loading &&
            (filtruActiv && interventii.length > 0 && filtrate.length === 0 ? (
              <p className="empty">Nicio intervenție nu corespunde filtrelor.</p>
            ) : (
              <InterventieList
                interventii={filtrate}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
        </section>
      </main>

      <footer className="app-footer">AutoJurnal · Proiect Tehnologii Web</footer>
    </>
  );
}
