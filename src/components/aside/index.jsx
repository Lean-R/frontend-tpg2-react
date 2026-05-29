import styles from "./Aside.module.css";
import { NavLink } from "react-router-dom";
import {
  IconHome,
  IconStar,
  IconNotebook,
  IconTicket,
  IconRoute,
} from "@tabler/icons-react";

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
          <IconHome className={styles.nav_icon} size={18} />
          Localhost Coffe
        </NavLink>

        <div className={styles.nav_section}>
          <span className={styles.nav_section_title}>BaristaDevs</span>
          <NavLink
            to="/ficha-dani"
            className={({ isActive }) =>
              isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
            }
          >
            <IconStar className={styles.nav_icon} size={16} />
            Dani
          </NavLink>
          <NavLink
            to="/ficha-lean"
            className={({ isActive }) =>
              isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
            }
          >
            <IconStar className={styles.nav_icon} size={16} />
            Lean
          </NavLink>
          <NavLink
            to="/ficha-naty"
            className={({ isActive }) =>
              isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
            }
          >
            <IconStar className={styles.nav_icon} size={16} />
            Naty
          </NavLink>
          <NavLink
            to="/ficha-luma"
            className={({ isActive }) =>
              isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
            }
          >
            <IconStar className={styles.nav_icon} size={16} />
            Luma
          </NavLink>
        </div>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
          }
        >
          <IconTicket className={styles.nav_icon} size={18} />
          Pedidos
        </NavLink>

        <NavLink
          to="/coffee-route"
          className={({ isActive }) =>
            isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
          }
        >
          <IconRoute className={styles.nav_icon} size={18} />
          Ruta del Café
        </NavLink>

        <NavLink
          to="/bitacora"
          className={({ isActive }) =>
            isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
          }
        >
          <IconNotebook className={styles.nav_icon} size={18} />
          Bitácora
        </NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
