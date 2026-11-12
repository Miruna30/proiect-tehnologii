// Bara de filtre de deasupra listei: stare, mașină și căutare text.
// Componenta nu filtrează nimic: doar afișează valorile primite și anunță schimbările.
const STARI = [
  { value: "toate", label: "Toate" },
  { value: "programate", label: "Programate" },
  { value: "efectuate", label: "Efectuate" },
];

export default function Filtre({ stare, onStare, masina, onMasina, masini, cautare, onCautare }) {
  return (
    <div className="filtre">
      <div className="filtre-stare" role="group" aria-label="Filtru după stare">
        {STARI.map((s) => (
          <button
            key={s.value}
            type="button"
            className={stare === s.value ? "chip activ" : "chip"}
            aria-pressed={stare === s.value}
            onClick={() => onStare(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="filtre-campuri">
        <label>
          <span className="sr-only">Mașina</span>
          <select value={masina} onChange={(e) => onMasina(e.target.value)}>
            <option value="">Toate mașinile</option>
            {masini.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Caută</span>
          <input
            type="search"
            value={cautare}
            onChange={(e) => onCautare(e.target.value)}
            placeholder="Caută după titlu..."
          />
        </label>
      </div>
    </div>
  );
}
