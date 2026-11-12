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
