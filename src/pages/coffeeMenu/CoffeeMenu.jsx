import { useEffect, useState } from "react";
import styles from "./CoffeeMenu.module.css";

const CoffeeMenu = () => {
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    fetch("/data/coffee-menu.json")
      .then((response) => response.json())
      .then((data) => setBebidas(data))
      .catch((error) => console.error("Error al cargar el menú:", error));
  }, []);

  const secciones = [
    "Cafés calientes",
    "Cafés fríos",
    "Especialidades",
    "Opciones sin café",
  ];

  return (
    <main className={styles.menuPage}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Coffee & Code</p>
        <h1>Sabores del Código</h1>
        <p>
          Una carta de especialidad inspirada en el café, el diseño y la programación.
        </p>
      </section>

      {secciones.map((seccion) => {
        const bebidasPorSeccion = bebidas.filter(
          (bebida) => bebida.seccion === seccion
        );

        if (bebidasPorSeccion.length === 0) return null;

        return (
          <section key={seccion} className={styles.menuSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.statusDot}></span>
              <h2>{seccion}</h2>
            </div>

            <div className={styles.grid}>
              {bebidasPorSeccion.map((bebida) => (
                <article key={bebida.id} className={styles.menuCard}>
                  <div className={styles.imageBox}>
                    <img src={bebida.imagen} alt={bebida.nombre} />
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <h3>{bebida.nombre}</h3>
                      <span className={styles.intensity}>
                        {bebida.intensidad}
                      </span>
                    </div>

                    <p className={styles.meta}>
                      {bebida.categoria} · {bebida.tecnologia}
                    </p>

                    <p className={styles.description}>{bebida.descripcion}</p>

                    <div className={styles.cardFooter}>
                      <span>{bebida.tipo}</span>
                      <span>
                        {bebida.disponible ? "Disponible" : "No disponible"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default CoffeeMenu;