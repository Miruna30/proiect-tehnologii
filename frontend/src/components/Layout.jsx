import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

// NavLink marchează singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

// Tema de pornire: cea aleasă anterior (pusă pe <html> de main.jsx) sau cea a sistemului
function temaInitiala() {
  const aleasa = document.documentElement.dataset.theme;
  if (aleasa === "dark" || aleasa === "light") return aleasa;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Antetul, navigația și subsolul, comune tuturor paginilor.
// Pagina curentă se desenează în locul lui <Outlet />.
export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
    try {
      localStorage.setItem("tema", noua);
    } catch {
      // fără localStorage, tema se pierde la refresh; nu e o eroare
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            Auto<span>Jurnal</span>
          </Link>

          <nav className={styles.nav} data-testid="nav">
            <NavLink to="/" end className={navClass}>
              Intervenții
            </NavLink>
            <NavLink to="/despre" className={navClass}>
              Despre
            </NavLink>
          </nav>

          <button
            type="button"
            className={styles.tema}
            onClick={handleTema}
            aria-pressed={tema === "dark"}
          >
            {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>AutoJurnal · Proiect Tehnologii Web</footer>
    </>
  );
}
