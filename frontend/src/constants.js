// Valorile fixe și etichetele lor, într-un singur loc.
// Folosite de formular, de card, de pagina de detaliu și de validare.

export const TIPURI = [
  { value: "revizie", label: "Revizie" },
  { value: "reparatie", label: "Reparație" },
  { value: "diagnoza", label: "Diagnoză" },
  { value: "inspectie", label: "Inspecție" },
];

// { revizie: "Revizie", reparatie: "Reparație", ... }
export const ETICHETE_TIP = Object.fromEntries(TIPURI.map((t) => [t.value, t.label]));
