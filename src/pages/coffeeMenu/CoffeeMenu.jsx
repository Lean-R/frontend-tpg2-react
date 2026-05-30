import { useEffect, useState } from "react";
import styles from "./CoffeeMenu.module.css";

const CoffeeMenu = () => {
  const [bebidas, setBebidas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [intensidad, setIntensidad] = useState("Todas");
  const [categoria, setCategoria] = useState("Todas");
  const [tecnologia, setTecnologia] = useState("Todas");

  // Carga del archivo JSON desde la carpeta public/data
  useEffect(() => {
    fetch("/data/coffee-menu.json")
      .then((response) => response.json())
      .then((data) => setBebidas(data))
      .catch((error) => console.error("Error al cargar el menú:", error));
  }, []);

  // Secciones visuales de la carta
  const secciones = [
    "Cafés calientes",
    "Cafés fríos",
    "Especialidades",
    "Opciones sin café",
  ];

  // Opciones de filtros generadas desde el JSON
  const categorias = [
    "Todas",
    ...new Set(bebidas.map((bebida) => bebida.categoria)),
  ];

  const tecnologias = [
    "Todas",
    ...new Set(bebidas.map((bebida) => bebida.tecnologia)),
  ];

  // Filtro combinado: buscador + intensidad + categoría + tecnología
  const bebidasFiltradas = bebidas.filter((bebida) => {
    const textoBusqueda = busqueda.toLowerCase();

    const coincideBusqueda =
      bebida.nombre.toLowerCase().includes(textoBusqueda) ||
      bebida.categoria.toLowerCase().includes(textoBusqueda) ||
      bebida.tecnologia.toLowerCase().includes(textoBusqueda) ||
      bebida.intensidad.toLowerCase().includes(textoBusqueda) ||
      bebida.descripcion.toLowerCase().includes(textoBusqueda);

    const coincideIntensidad =
      intensidad === "Todas" || bebida.intensidad === intensidad;

    const coincideCategoria =
      categoria === "Todas" || bebida.categoria === categoria;

    const coincideTecnologia =
      tecnologia === "Todas" || bebida.tecnologia === tecnologia;

    return (
      coincideBusqueda &&
      coincideIntensidad &&
      coincideCategoria &&
      coincideTecnologia
    );
  });

  const noHayResultados = bebidasFiltradas.length === 0;

  return (
    <main className={styles.menuPage}>
      {/* Encabezado de la página y controles */}
      <section className={styles.topPanel}>
        <article className={styles.heroTerminal}>
          <div className={styles.terminalHeader}>
            <span>THE COFFEE-CODE MENU</span>
            <span>./menu.js</span>
          </div>

          <div className={styles.terminalBody}>
            <p className={styles.terminalMeta}>
              [SYSTEM] : Carta cargada correctamente
            </p>
            <p className={styles.terminalMeta}>
              [SYSTEM] : 20 bebidas listas para servir
            </p>
            <p className={styles.terminalMeta}>
              [SYSTEM] : Filtros habilitados
            </p>

            <p className={styles.terminalPrompt}>$ &gt; Coffee &amp; Code</p>

            <h1 className={styles.terminalTitle}>Sabores del Código</h1>

            <p className={styles.terminalText}>
              Una carta de especialidad inspirada en el café, el diseño y la
              programación.
            </p>

            <p className={styles.terminalTyping}>
              Elegí tu bebida, filtrá tu búsqueda y dejá que el código se sirva
              solo.
            </p>

            <p className={styles.terminalCursor}>$ &gt; _</p>
          </div>
        </article>

        {/* Buscador y filtros */}
        <section className={styles.controlsPanel}>
          <div className={styles.searchBox}>
            <label htmlFor="searchCoffee">Buscar en la carta</label>

            <input
              id="searchCoffee"
              type="text"
              placeholder="Bebida, tecnología, categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className={styles.filtersRow}>
            <div className={styles.filterBox}>
              <label htmlFor="filterIntensity">Intensidad</label>

              <select
                id="filterIntensity"
                value={intensidad}
                onChange={(e) => setIntensidad(e.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div className={styles.filterBox}>
              <label htmlFor="filterCategory">Categoría</label>

              <select
                id="filterCategory"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterBox}>
              <label htmlFor="filterTechnology">Tecnología</label>

              <select
                id="filterTechnology"
                value={tecnologia}
                onChange={(e) => setTecnologia(e.target.value)}
              >
                {tecnologias.map((tecnologia) => (
                  <option key={tecnologia} value={tecnologia}>
                    {tecnologia}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </section>

      {/* Mensaje cuando no hay resultados */}
      {noHayResultados && (
        <p className={styles.noResults}>
          No encontramos bebidas con esa búsqueda. Probá con otra palabra de la
          carta.
        </p>
      )}

      {/* Renderizado de bebidas por sección */}
      {secciones.map((seccion) => {
        const bebidasPorSeccion = bebidasFiltradas.filter(
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