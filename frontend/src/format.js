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

// Câte zile sunt de azi până la o dată (negativ = în trecut)
export function zilePanaLa(iso) {
  const azi = new Date();
  azi.setHours(0, 0, 0, 0);
  const [an, luna, zi] = iso.split("-").map(Number);
  const tinta = new Date(an, luna - 1, zi);
  return Math.round((tinta - azi) / 86400000);
}

// "peste 19 zile", "azi", "acum 33 de zile"
export function textZile(zile) {
  if (zile === 0) return "azi";
  if (zile === 1) return "mâine";
  if (zile === -1) return "ieri";
  const n = numarCu(Math.abs(zile), "zi", "zile");
  return zile > 0 ? `peste ${n}` : `acum ${n}`;
}
