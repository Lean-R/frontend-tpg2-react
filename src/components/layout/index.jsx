import Header from "@components/header";
import Footer from "@components/footer";
import Aside from "@components/aside";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.layout_wrapper}>
        <div className={styles.aside_container}>
          <Aside />
        </div>
        <div className={styles.main_container}>
          <main className={styles.content}>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
