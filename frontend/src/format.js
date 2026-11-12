// Funcții mici de afișare, folosite de mai multe componente.
// Datele rămân în formatul din db.json; doar textul de pe ecran se formatează.

// "2026-12-05" -> "05.12.2026"
export function formatData(iso) {
  const [an, luna, zi] = iso.split("-");
  return `${zi}.${luna}.${an}`;
}

// 152000 -> "152.000"
export function formatNumar(n) {
  return n.toLocaleString("ro-RO");
}

// Acordul numeralului în română: 1 intervenție, 3 intervenții, 20 de intervenții
export function numarCu(n, singular, plural) {
  if (n === 1) return `1 ${singular}`;
  const rest = n % 100;
  const cuDe = n !== 0 && (rest === 0 || rest >= 20);
  return `${n} ${cuDe ? "de " : ""}${plural}`;
}
