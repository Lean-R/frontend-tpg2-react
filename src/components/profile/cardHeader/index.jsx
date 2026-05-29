import styles from "@components/profile/cardHeader/CardHeader.module.css"
import { NavLink } from "react-router-dom";


const CardHeader = ( {data} ) => {
  if (!data) return null;
const {name, version} = data;

  return (
    <div className={styles.card_header}>
        <div className={styles.header_left}>
          <span className={styles.status_dot}></span>
          <NavLink to="/" className={styles.back_link}>
              {">> exit_system"}
          </NavLink>
        </div>
        <div className={styles.header_right}>
          <span className={styles.system_tag}>
              {name} BLEND MAKER // {version}
          </span>
        </div>
    </div>
  )
}

export default CardHeader
