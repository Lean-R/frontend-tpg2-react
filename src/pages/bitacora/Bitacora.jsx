import styles from "./bitacora-page.module.css";

const ENTRIES = [
  {
    id: "fase-inicial",
    title: "1. Inicio del proyecto y creación del repositorio",
    content: (
      <p>
        Se revisó la consigna del trabajo práctico grupal de Front End y se
        definió el uso de <strong>HTML, CSS y JavaScript puro</strong>. Se
        organizó el repositorio en GitHub para el trabajo colaborativo.
      </p>
    ),
  },
  {
    id: "propuesta-creativa",
    title: "2. Definición de la propuesta creativa",
    content: (
      <p>
        El equipo definió el concepto: una cafetería ficticia integrada por
        <em> "baristas-devs"</em>. Se combinaron elementos del café (blends,
        latte art) con el entorno tecnológico (terminales, código).
      </p>
    ),
  },
  {
    id: "organizacion-equipo",
    title: "3. Organización del equipo y distribución de tareas",
    content: (
      <ul>
        <li>
          <strong>Lean Backend Brewer:</strong> Leandro Rocha (Backend & Datos).
        </li>
        <li>
          <strong>Naty Coffee Debugger:</strong> Natalia Burnazzi (QA &
          Frontend).
        </li>
        <li>
          <strong>Luma Blend Maker:</strong> Luciana Quilcate (Full-Stack
          Roaster).
        </li>
        <li>
          <strong>Dany Deploy Keeper:</strong> Daniel Clementín (DevOps).
        </li>
      </ul>
    ),
  },
  {
    id: "index-desarrollo",
    title: "4. Desarrollo de la página principal",
    content: (
      <p>
        Se implementó el <code>index.html</code> con secciones como Hero, Navbar
        dinámico y cards de integrantes. Se modularizaron los estilos en
        archivos CSS independientes para mayor orden.
      </p>
    ),
  },
  {
    id: "fichas-individuales",
    title: "5. Desarrollo de fichas individuales",
    content: (
      <p>
        Cada integrante desarrolló su ficha con una base común: avatar, receta
        de código e interacción tipo terminal.
      </p>
    ),
  },
  {
    id: "interacciones-js",
    title: "6. Interacciones con JavaScript",
    content: (
      <>
        <p>Se incorporaron funciones dinámicas como:</p>
        <ul>
          <li>Carga de Navbar y Footer.</li>
          <li>Terminales modales.</li>
          <li>Contadores y Tooltips para multimedia.</li>
        </ul>
      </>
    ),
  },
  {
    id: "recursos-visuales",
    title: "7. Recursos visuales e inteligencia artificial",
    content: (
      <p>
        Uso de <strong>IA</strong> para generar avatares coherentes y diseño de
        logo integrando granos de café con símbolos de código.
      </p>
    ),
  },
  {
    id: "dificultades-soluciones",
    title: "8. Dificultades encontradas y soluciones",
    content: (
      <p>
        Se resolvieron problemas de rutas de archivos, extensiones de imágenes
        incorrectas y sincronización entre el <code>data-id</code> del HTML y el
        archivo <code>JSON</code>.
      </p>
    ),
  },
  {
    id: "colaboracion-github",
    title: "9. Integración de cambios y trabajo colaborativo",
    content: (
      <p>
        Flujo de trabajo basado en ramas (branching), Pull Requests y revisiones
        constantes en GitHub.
      </p>
    ),
  },
  {
    id: "estado-actual",
    title: "10. Estado actual y próximos pasos",
    content: (
      <p>
        Proyecto con identidad visual definida. Próximos pasos: revisión de
        <strong> responsividad</strong>, actualización del README y deploy final
        en Vercel.
      </p>
    ),
  },
];

export default function BitacoraPage() {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.bitacoraTitle}>_BITÁCORA_DEL_PROYECTO</h1>
          <p className={styles.headerSubtitle}>The Coffee-Code Engine</p>
        </header>

        {ENTRIES.map((entry) => (
          <section key={entry.id} id={entry.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{entry.title}</h2>
            {entry.content}
          </section>
        ))}
      </main>
    </div>
  );
}
