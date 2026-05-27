import styles from "./Aside.module.css";

const Aside = () => {
  return (
    <aside className={styles.os_aside}>
      <div className={styles.aside_header}>
        <img src="./img/logo.png" alt="logo" className={styles.aside_logo} />
        <span className={styles.aside_brand}>Coffee Code Engine</span>
      </div>
    </aside>
  );
};

export default Aside;
