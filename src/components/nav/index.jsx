//estilo
import styles from '@components/nav/Nav.module.css'

//librerias
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useEffect, useState } from 'react'


const Nav = () => {

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <nav className={styles.os_navbar}>
      <div className={styles.nav_left}>
        <button className={styles.nav_hamburger} id="hamburger-menu" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <span className={styles.nav_brand}>Coffee Code Engine</span>
      </div>

      <ul className={styles.nav_links} id="nav-menu">
        <li><HashLink to="#runtime">RUNTIME</HashLink></li>
        <li><HashLink to="#brew">BREW_DOCS</HashLink></li>
        <li><HashLink to="#source">SOURCE</HashLink></li>
        <li><HashLink to="#terminal">TERMINAL</HashLink></li>
        <li><NavLink to="/bitacora">BITACORA</NavLink></li>
      </ul>

      <div className={styles.nav_system_icons}>
        <i className="icon-wifi"></i> <i className="icon-battery"></i>
        <span className={styles.nav_time} id="current-time">{currentTime}</span>
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