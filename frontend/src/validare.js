// Regulile de validare ale unei intervenții (aceleași ca în Etapa 2).
// Funcție pură: primește datele și întoarce mesajul de eroare sau "".
import { TIPURI } from "./constants.js";

export const TITLU_MAX = 100;
export const MASINA_MAX = 60;
export const KM_MAX = 2000000;
export const COST_MAX = 1000000;

export function valideazaInterventie({ titlu, tip, masina, data, km, cost }) {
  const t = titlu.trim();
  if (t === "") return "Titlul este obligatoriu.";
  if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
  if (!TIPURI.some((x) => x.value === tip)) return "Alege un tip din listă.";
  const m = masina.trim();
  if (m === "") return "Mașina este obligatorie.";
  if (m.length > MASINA_MAX) return `Mașina are maximum ${MASINA_MAX} de caractere.`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || Number.isNaN(Date.parse(data)))
    return "Alege o dată validă.";
  if (!Number.isInteger(km) || km < 0 || km > KM_MAX)
    return "Kilometrajul trebuie să fie un număr întreg între 0 și 2.000.000.";
  if (Number.isNaN(cost) || cost < 0 || cost > COST_MAX)
    return "Costul trebuie să fie între 0 și 1.000.000 lei.";
  return "";
}
