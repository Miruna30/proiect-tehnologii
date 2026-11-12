import { useState } from "react";
import { TIPURI, TITLU_MAX, MASINA_MAX, valideazaInterventie } from "../validare.js";

// Data de azi, în formatul cerut de <input type="date">: "2026-11-12"
function azi() {
  const d = new Date();
  const luna = String(d.getMonth() + 1).padStart(2, "0");
  const zi = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${luna}-${zi}`;
}

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri.
// masini = mașinile existente, propuse ca sugestii în câmpul Mașina.
export default function InterventieForm({ onAdd, masini }) {
  const [titlu, setTitlu] = useState("");
  const [tip, setTip] = useState("revizie");
  const [masina, setMasina] = useState("");
  const [data, setData] = useState(azi);
  const [km, setKm] = useState("");
  const [cost, setCost] = useState("");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); // oprește reîncărcarea paginii

    // Câmpurile numerice sunt text în formular; se transformă abia acum.
    // Un câmp gol devine NaN pentru km (obligatoriu) și 0 pentru cost (opțional).
    const interventie = {
      titlu: titlu.trim(),
      tip,
      masina: masina.trim(),
      data,
      km: km.trim() === "" ? NaN : Number(km),
      cost: cost.trim() === "" ? 0 : Number(cost),
      efectuata: false,
    };

    const mesaj = valideazaInterventie(interventie);
    if (mesaj) {
      setEroare(mesaj);
      return; // nu se trimite nimic la server
    }

    setEroare("");
    setTrimite(true);
    try {
      await onAdd(interventie);
      // Golirea se face doar dacă salvarea a reușit
      setTitlu("");
      setTip("revizie");
      setKm("");
      setCost("");
      // mașina și data rămân: de obicei se adaugă mai multe intervenții la aceeași mașină
    } catch (err) {
      setEroare(`Nu am putut salva intervenția: ${err.message}`);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className="interventie-form" onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Titlu
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Schimb ulei și filtre"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>

      <label>
        Tip
        <select value={tip} onChange={(e) => setTip(e.target.value)} data-testid="form-tip">
          {TIPURI.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Mașina
        <input
          type="text"
          value={masina}
          onChange={(e) => setMasina(e.target.value)}
          placeholder="Ex: VW Golf 7 · B 77 MRP"
          maxLength={MASINA_MAX}
          list="masini-existente"
          data-testid="form-masina"
        />
      </label>
      <datalist id="masini-existente">
        {masini.map((m) => (
          <option key={m} value={m} />
        ))}
      </datalist>

      <div className="form-row">
        <label>
          Data
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            data-testid="form-data"
          />
        </label>
        <label>
          Kilometraj
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            placeholder="Ex: 152000"
            data-testid="form-km"
          />
        </label>
      </div>

      <label>
        Cost (lei)
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Ex: 650"
          data-testid="form-cost"
        />
      </label>

      {eroare && (
        <p className="error" role="alert" data-testid="form-error">
          {eroare}
        </p>
      )}

      <button type="submit" disabled={trimite} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă"}
      </button>
    </form>
  );
}
