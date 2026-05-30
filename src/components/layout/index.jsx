import { useState } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import Aside from "@components/aside";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.layout_wrapper}>
      {sidebarOpen && <div className={styles.overlay} onClick={closeSidebar} />}

      <div
        className={`${styles.aside_container} ${sidebarOpen ? styles.aside_open : ""}`}
      >
        <Aside onClose={closeSidebar} />
      </div>

      <div className={styles.main_container}>
        <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
