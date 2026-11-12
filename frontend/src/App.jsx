import InterventieList from "./components/InterventieList.jsx";

// Datele de test din README (aceleași ca în Etapa 2)
const interventii = [
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

export default function App() {
  // Valori calculate din date, cu aceeași logică din Etapa 2
  const programate = interventii.filter((i) => !i.efectuata).length;

  return (
    <>
      <header className="app-header">
        <h1>AutoJurnal</h1>
        <p>Istoricul și planificarea intervențiilor de service pentru mașinile tale.</p>
        <p className="app-count">
          {interventii.length} intervenții, dintre care {programate} programate
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Intervențiile mele</h2>
          <InterventieList interventii={interventii} />
        </section>
      </main>
    </>
  );
}
