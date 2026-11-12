import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

// Opțional (Etapa 5): tema aleasă data trecută se aplică înainte de prima randare
try {
  const temaSalvata = localStorage.getItem("tema");
  if (temaSalvata) document.documentElement.dataset.theme = temaSalvata;
} catch {
  // fără localStorage se folosește tema sistemului
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
