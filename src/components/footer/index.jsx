//estilos
import styles from "@components/footer/Footer.module.css"

import {NavLink} from 'react-router-dom'

const Footer = () => {
  return (
  <footer className={styles.os_footer}>
    <div className={styles.footer_left}>
      <span className={styles.exit_command}>process.exit(0);</span>
      <span className={styles.exit_comment}>// Hecho con mucha cafeína.</span>
    </div>

    <div className={styles.footer_center}>
      <span className={styles.footer_info + ' ' + styles.version}>v1.0.4-stable</span>
      <span className={styles.footer_divider}>•</span>
      <NavLink to="/bitacora" className={styles.footer_info}>System Logs - Bitácora</NavLink>
      <span className={styles.footer_divider}>•</span>
      <a href="https://github.com/Lean-R/frontend-tpg2-react" className={styles.footer_info} target='_blank' rel="noopener noreferrer">GitHub</a>
    </div>

    <div className={styles.footer_right}>
      <span className={styles.engine_tag}>ENGINE_01</span>
    </div>
  </footer>
  )
}

export default Footer
