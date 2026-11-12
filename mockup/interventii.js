// AutoJurnal · Etapa 2: logica pe date, fără DOM.
// Fișierul nu modifică pagina: doar lucrează cu array-ul și scrie în consolă.

// Datele de test din README, fiecare cu un id unic
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

// Valorile permise pentru eticheta fixă și limitele câmpurilor
const TIPURI = ["revizie", "reparatie", "diagnoza", "inspectie"];
const TITLU_MAX = 100;
const KM_MAX = 2000000;

// --- Citire ---

function listeazaTitluri(lista) {
  return lista.map((i) => i.titlu);
}

// Intervențiile încă neefectuate (planificate)
function numaraProgramate(lista) {
  return lista.filter((i) => !i.efectuata).length;
}

// Căutare după titlu sau după mașină, fără să conteze literele mari/mici
function cautaInterventii(lista, text) {
  const cautat = text.trim().toLowerCase();
  return lista.filter(
    (i) =>
      i.titlu.toLowerCase().includes(cautat) ||
      i.masina.toLowerCase().includes(cautat)
  );
}

// Suma cheltuită: doar intervențiile efectuate (cele programate nu s-au plătit încă)
function costTotal(lista) {
  return lista
    .filter((i) => i.efectuata)
    .reduce((suma, i) => suma + i.cost, 0);
}

// --- Adăugare ---

// Noul id: cel mai mare id existent plus unu (nu lista.length + 1!)
function nextId(lista) {
  return lista.reduce((max, i) => Math.max(max, i.id), 0) + 1;
}

// Întoarce un mesaj de eroare sau "" dacă datele sunt valide
function valideazaInterventie({ titlu, tip, masina, data, km, cost }) {
  const t = (titlu ?? "").trim();
  if (t === "") return "Titlul este obligatoriu.";
  if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
  if (!TIPURI.includes(tip)) return `Tipul „${tip}” nu există.`;
  if ((masina ?? "").trim() === "") return "Mașina este obligatorie.";
  if (Number.isNaN(Date.parse(data))) return "Data nu este validă.";
  if (!Number.isInteger(km) || km < 0 || km > KM_MAX)
    return `Kilometrajul trebuie să fie între 0 și ${KM_MAX}.`;
  if (typeof cost !== "number" || Number.isNaN(cost) || cost < 0)
    return "Costul nu poate fi negativ.";
  return "";
}

// Adaugă imutabil: întoarce o listă nouă sau lista neschimbată, dacă datele nu sunt valide
function adaugaInterventie(lista, date) {
  const { tip = "revizie", cost = 0 } = date;
  const deVerificat = { ...date, tip, cost };
  const eroare = valideazaInterventie(deVerificat);
  if (eroare) {
    console.warn("Nu s-a adăugat:", eroare);
    return lista;
  }
  const noua = {
    id: nextId(lista),
    titlu: deVerificat.titlu.trim(),
    efectuata: false,
    tip,
    masina: deVerificat.masina.trim(),
    data: deVerificat.data,
    km: deVerificat.km,
    cost,
  };
  return [...lista, noua];
}

// --- Modificare și ștergere ---

function comutaEfectuata(lista, id) {
  return lista.map((i) => (i.id === id ? { ...i, efectuata: !i.efectuata } : i));
}

function stergeInterventie(lista, id) {
  return lista.filter((i) => i.id !== id);
}

// --- Testele din consolă ---

console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(interventii).join(", "));
console.log("Programate:", numaraProgramate(interventii));
console.log(
  "Căutare 'golf':",
  listeazaTitluri(cautaInterventii(interventii, "golf")).join(", ")
);
console.log("Cost total efectuate:", costTotal(interventii), "lei");

console.log("--- Adăugare ---");
let lista = adaugaInterventie(interventii, {
  titlu: "Diagnoză martor motor aprins",
  tip: "diagnoza",
  masina: "Dacia Logan · IF 12 ABC",
  data: "2026-11-20",
  km: 98300,
  cost: 150,
});
console.log("Lista nouă:", lista.length, "intervenții");
console.log("Originalul a rămas cu:", interventii.length, "intervenții");
console.log("Id-ul noii intervenții:", lista[lista.length - 1].id);

console.log("--- Modificare și ștergere ---");
lista = comutaEfectuata(lista, 1);
console.log("După bifarea id 1, programate:", numaraProgramate(lista));
console.log("Cost total după bifare:", costTotal(lista), "lei");
lista = stergeInterventie(lista, 3);
console.log("După ștergerea id 3:", listeazaTitluri(lista).join(", "));
console.log("Id-ul următor (nu se repetă după ștergere):", nextId(lista));

console.log("--- Validare ---");
adaugaInterventie(lista, { titlu: "   ", masina: "Golf", data: "2026-01-01", km: 1 });
adaugaInterventie(lista, { titlu: "Ceva", tip: "urgenta", masina: "Golf", data: "2026-01-01", km: 1 });
adaugaInterventie(lista, { titlu: "Ceva", masina: "", data: "2026-01-01", km: 1 });
adaugaInterventie(lista, { titlu: "Ceva", masina: "Golf", data: "2026-01-01", km: -5 });
