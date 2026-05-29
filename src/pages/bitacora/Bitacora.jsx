import { useEffect, useRef, useState } from "react";
import styles from "./bitacora-page.module.css";
import { IconNotebook, IconCoffee } from "@tabler/icons-react";

const ENTRIES = [
  {
    id: "fase-inicial",
    title: "Inicio del proyecto y creación del repositorio",
    text: "Se revisó la consigna del trabajo práctico grupal de Front End y se definió el uso de <strong>HTML, CSS y JavaScript puro</strong>. Se organizó el repositorio en GitHub para el trabajo colaborativo.",
  },
  {
    id: "propuesta-creativa",
    title: "Definición de la propuesta creativa",
    text: 'El equipo definió el concepto: una cafetería ficticia integrada por <strong>"baristas-devs"</strong>. Se combinaron elementos del café (blends, latte art) con el entorno tecnológico (terminales, código).',
  },
  {
    id: "organizacion-equipo",
    title: "Organización del equipo y distribución de tareas",
    text: "Se asignaron los roles del equipo según el perfil de cada miembro:",
    details: [
      "<strong>Lean Backend Brewer:</strong> Leandro Rocha (Backend & Datos).",
      "<strong>Naty Coffee Debugger:</strong> Natalia Burnazzi (QA & Frontend).",
      "<strong>Luma Blend Maker:</strong> Luciana Quilcate (Full-Stack Roaster).",
      "<strong>Dany Deploy Keeper:</strong> Daniel Clementín (DevOps).",
    ],
  },
  {
    id: "index-desarrollo",
    title: "Desarrollo de la página principal",
    text: "Se implementó el <strong>index.html</strong> con secciones como Hero, Navbar dinámico y cards de integrantes. Se modularizaron los estilos en archivos CSS independientes para mayor orden.",
  },
  {
    id: "fichas-individuales",
    title: "Desarrollo de fichas individuales",
    text: "Cada integrante desarrolló su ficha con una base común: avatar, receta de código e interacción tipo terminal.",
  },
  {
    id: "interacciones-js",
    title: "Interacciones con JavaScript",
    text: "Se incorporaron funciones dinámicas como carga de Navbar y Footer, terminales modales, contadores y tooltips para multimedia.",
  },
  {
    id: "recursos-visuales",
    title: "Recursos visuales e inteligencia artificial",
    text: "Uso de <strong>IA</strong> para generar avatares coherentes y diseño de logo integrando granos de café con símbolos de código.",
  },
  {
    id: "dificultades-soluciones",
    title: "Dificultades encontradas y soluciones",
    text: "Se resolvieron problemas de rutas de archivos, extensiones de imágenes incorrectas y sincronización entre el <strong>data-id</strong> del HTML y el archivo JSON.",
  },
  {
    id: "colaboracion-github",
    title: "Integración de cambios y trabajo colaborativo",
    text: "Flujo de trabajo basado en ramas (branching), Pull Requests y revisiones constantes en GitHub.",
  },
  {
    id: "estado-actual",
    title: "Estado actual y próximos pasos",
    text: "Proyecto con identidad visual definida. Próximos pasos: revisión de <strong>responsividad</strong>, actualización del README y deploy final en Vercel.",
  },
];

function LogEntry({ entry, index, visible }) {
  /*  Renderiza texto con <strong>  */
  const renderText = (html) => {
    const parts = html.split(/(<\/?strong>)/g);
    let isStrong = false;
    return parts.map((part, i) => {
      if (part === "<strong>") {
        isStrong = true;
        return null;
      }
      if (part === "</strong>") {
        isStrong = false;
        return null;
      }
      return isStrong ? (
        <strong key={i}>{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      );
    });
  };

  return (
    <article
      id={entry.id}
      className={`${styles.entry} ${visible ? styles.entryVisible : ""}`}
    >
      {/*  Número decorativo grande  */}
      <span className={styles.entryNumber}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/*  Header  */}
      <div className={styles.entryHeader}>
        <span className={styles.entryTag}>{index + 1}</span>
        <h2 className={styles.entryTitle}>
          <span className={styles.entryTitleAccent}>&gt;</span>
          {entry.title}
        </h2>
      </div>

      {/*  Texto principal  */}
      <p className={styles.entryText}>{renderText(entry.text)}</p>

      {/*  Lista de detalles  */}
      {entry.details && entry.details.length > 0 && (
        <ul className={styles.entryDetails}>
          {entry.details.map((detail, i) => (
            <li key={i} className={styles.entryDetail}>
              {renderText(detail)}
            </li>
          ))}
        </ul>
      )}

      {/*  Footer  */}
      <div className={styles.entryFooter}>
        <span className={styles.entryMeta}>
          <IconCoffee size={11} stroke={1.5} />
          <span>
            Fase <span className={styles.entryMetaAccent}>{index + 1}</span> de{" "}
            {ENTRIES.length}
          </span>
        </span>
        <span className={styles.entryMeta}>
          <IconNotebook size={11} stroke={1.5} />
          <span>{entry.id.replace(/-/g, " ")}</span>
        </span>
      </div>
    </article>
  );
}

export default function BitacoraPage() {
  const [visibleIds, setVisibleIds] = useState(new Set());
  const entryRefs = useRef({});

  /*  Observer para animación al scrollear  */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleIds((prev) => new Set(prev).add(entry.target.dataset.id));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    Object.values(entryRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setEntryRef = (id) => (el) => {
    entryRefs.current[id] = el;
  };

  /*  Orden inverso: los últimos índices se renderizan primero  */
  const reversedEntries = [...ENTRIES].reverse();

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.container}>
        {/*  Encabezado  */}
        <header className={styles.header}>
          <span className={styles.headerBadge}>
            <IconNotebook size={12} stroke={2} />
            SYSTEM LOG
          </span>
          <h1 className={styles.headerTitle}>
            _BITÁCORA_
            <span className={styles.headerTitleAccent}>DEL_PROYECTO</span>
          </h1>
          <p className={styles.headerSubtitle}>
            Registro de tueste, extracción y desarrollo del blend Coffee-Code
            Engine
          </p>
          <div className={styles.headerDivider} />
        </header>

        {/*  Entradas  */}
        {reversedEntries.map((entry) => (
          <div key={entry.id} ref={setEntryRef(entry.id)} data-id={entry.id}>
            <LogEntry
              entry={entry}
              /*  El índice original se preserva para el número de fase  */
              index={ENTRIES.findIndex((e) => e.id === entry.id)}
              visible={visibleIds.has(entry.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
