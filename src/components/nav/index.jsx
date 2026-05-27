//estilo
import styles from '@components/nav/Nav.module.css'

//librerias
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Nav = () => {
  return (
    <nav className={styles.os_navbar}>
      <div className={styles.nav_left}>
        <button className={styles.nav_hamburger} id="hamburger-menu" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <img src="./img/logo.png" alt="logo" className={styles.nav_logo} />
        <span className={styles.nav_brand}>Coffee Code Engine</span>
      </div>

      <ul className={styles.nav_links} id="nav-menu">
        <li><HashLink to="index.html#runtime">RUNTIME</HashLink></li>
        <li><HashLink to="index.html#brew">BREW_DOCS</HashLink></li>
        <li><HashLink to="index.html#source">SOURCE</HashLink></li>
        <li><HashLink to="index.html#terminal">TERMINAL</HashLink></li>
        <li><NavLink to="/bitacora">BITACORA</NavLink></li>
      </ul>

      <div className={styles.nav_system_icons}>
        <i className="icon-wifi"></i> <i className="icon-battery"></i>
        <span className={styles.nav_time} id="current-time">00:00:00 AM</span>
        <div className={styles.window_controls}>
          <span>─</span>
          <span>▢</span>
          <span>✕</span>
        </div>
      </div>
    </nav>
  )
}

export default Nav