import styles from "./TicketLoader.module.css";

export default function TicketLoader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cup}>
        <div className={styles.cupBody}>
          <div className={styles.liquid} />
        </div>
        <div className={styles.handle} />
        <div className={styles.steam}>
          <span className={styles.steamDrop} />
          <span className={styles.steamDrop} />
          <span className={styles.steamDrop} />
        </div>
      </div>
      <p className={styles.text}>Preparando pedidos...</p>
    </div>
  );
}
