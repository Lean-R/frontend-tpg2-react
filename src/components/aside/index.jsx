import styles from "./Aside.module.css";
import { NavLink } from "react-router-dom";

const Aside = () => {
  return (
    <aside className={styles.os_aside}>
      <div className={styles.aside_header}>
        <img src="./img/logo.png" alt="logo" className={styles.aside_logo} />
        <span className={styles.aside_brand}>Coffee Code Engine</span>
      </div>

      <nav className={styles.aside_nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
          }
        >
          <span className={styles.nav_icon}>&#8962;</span>
          Home
        </NavLink>

        <div className={styles.nav_section}>
          <span className={styles.nav_section_title}>Bartenders</span>
          <NavLink
            to="/ficha-dani"
            className={({ isActive }) =>
              isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
            }
          >
            <span className={styles.nav_icon}>&#9733;</span>
            Dani
          </NavLink>
          <NavLink
            to="/ficha-lean"
            className={({ isActive }) =>
              isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
            }
          >
            <span className={styles.nav_icon}>&#9733;</span>
            Lean
          </NavLink>
          <NavLink
            to="/ficha-naty"
            className={({ isActive }) =>
              isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
            }
          >
            <span className={styles.nav_icon}>&#9733;</span>
            Naty
          </NavLink>
          <NavLink
            to="/ficha-luma"
            className={({ isActive }) =>
              isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
            }
          >
            <span className={styles.nav_icon}>&#9733;</span>
            Luma
          </NavLink>
        </div>

        <NavLink
          to="/bitacora"
          className={({ isActive }) =>
            isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
          }
        >
          <span className={styles.nav_icon}>&#9998;</span>
          Bitácora
        </NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
