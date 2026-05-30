import { useEffect, useRef, useState } from "react";
import styles from "./bitacora-page.module.css";
import { IconNotebook, IconCoffee } from "@tabler/icons-react";

const STAGES = [
  {
    id: "tp2-react",
    badge: "ETAPA 02",
    title: "Migración a React",
    subtitle:
      "Continuación del proyecto Coffee-Code Engine como aplicación modular, dinámica y colaborativa.",
    startNumber: 11,
    entries: [
      {
        id: "tp2-arquitectura",
        title: "Inicio del TP2 y nueva arquitectura",
        text: "Se revisó la consigna del <strong>Trabajo Práctico Grupal 2</strong> y se decidió crear una nueva versión del proyecto Coffee-Code Engine en React, manteniendo la identidad visual del TP1 pero reorganizando la estructura general.",
      },
      {
        id: "tp2-migracion",
        title: "Migración de HTML, CSS y JavaScript a React",
        text: "Se inició la transformación del proyecto original hacia una aplicación basada en <strong>React</strong>. Esto permitió reemplazar estructuras repetidas por componentes reutilizables, páginas internas y renderizado dinámico.",
      },
      {
        id: "tp2-rutas-layout",
        title: "Configuración de rutas y Layout general",
        text: "Se incorporó <strong>React Router</strong> para navegar entre las distintas secciones del proyecto. También se integró un Layout general para mantener una estructura común con navegación, sidebar, header y footer.",
      },
      {
        id: "tp2-sidebar-dashboard",
        title: "Desarrollo del dashboard y sidebar",
        text: "Se avanzó en una interfaz tipo dashboard, con navegación lateral fija, accesos a perfiles, pedidos, ruta del café, bitácora y páginas internas. Se mantuvo la estética oscura con naranja tostado y verde terminal.",
      },
      {
        id: "tp2-perfiles",
        title: "Rediseño de perfiles individuales",
        text: "Las fichas de integrantes fueron adaptadas a React y reorganizadas en componentes. Se sumaron secciones visuales como <strong>tech stack</strong>, barras de habilidades, enlaces de contacto y proyectos realizados por cada integrante.",
      },
      {
        id: "tp2-componentes",
        title: "Componentización de la interfaz",
        text: "Se organizaron componentes reutilizables para distintas partes del proyecto, como cards, perfiles, carruseles, secciones del home, galería de workspace, tickets, loaders, navbar, footer y elementos visuales compartidos.",
      },
      {
        id: "tp2-home",
        title: "Construcción de la página principal",
        text: "Se trabajó en la página de inicio como presentación general del proyecto, incorporando secciones visuales relacionadas con la identidad Coffee-Code Engine, el proceso de trabajo y la presentación del equipo.",
      },
      {
        id: "tp2-ruta-cafe",
        title: "Implementación de la Ruta del Café",
        text: "Se desarrolló la sección <strong>Ruta del Café</strong> como representación visual del árbol de renderizado de la aplicación, mostrando cómo fluye la estructura desde el componente raíz hacia páginas, layout y componentes internos.",
      },
      {
        id: "tp2-pedidos",
        title: "Desarrollo de la sección Pedidos",
        text: "Se creó una sección de pedidos o tickets inspirada en issues de desarrollo. Se incorporaron categorías tecnológicas como React, TypeScript, VS Code, Bun y Warp, permitiendo visualizar tarjetas de tickets con información asociada.",
      },
      {
        id: "tp2-recursos-visuales",
        title: "Recursos visuales y galería",
        text: "Se agregaron imágenes del espacio de trabajo y recursos visuales vinculados a los perfiles y a la identidad general del proyecto. Estos elementos fortalecen la estética de cafetería tecnológica.",
      },
      {
        id: "tp2-json",
        title: "Explorador de datos locales",
        text: "Se incorporó un archivo JSON local con 20 bebidas inspiradas en café y programación. A partir de esos datos, se desarrolló la página <strong>Sabores del Código</strong> con renderizado dinámico, buscador y filtros.",
      },
      {
        id: "tp2-github",
        title: "Trabajo colaborativo con Git y GitHub",
        text: "El equipo trabajó con ramas, commits, push y Pull Requests. Durante la integración surgieron conflictos en archivos compartidos, especialmente en rutas y estructura general, que fueron resueltos combinando los aportes de cada integrante.",
      },
      {
        id: "tp2-dificultades",
        title: "Dificultades técnicas encontradas",
        text: "Durante la migración surgieron desafíos relacionados con imports, rutas relativas, organización de carpetas, compatibilidad entre componentes, carga de imágenes, CSS Modules, dependencias y resolución de conflictos al integrar ramas.",
      },
      {
        id: "tp2-ajustes",
        title: "Ajustes de diseño y consistencia visual",
        text: "Se realizaron ajustes para mantener una estética coherente en toda la aplicación: colores, tipografías, espaciados, comportamiento responsive, estructura de cards, efectos visuales y continuidad con el TP1.",
      },
      {
        id: "tp2-documentacion",
        title: "Documentación y próximos pasos",
        text: "Se comenzó a actualizar la documentación del proyecto, incluyendo bitácora, README, explicación de la migración a React, uso de IA, estructura de componentes, árbol de renderizado y capturas. Queda pendiente revisar responsive, testear rutas y preparar el deploy final.",
      },
    ],
  },
  {
    id: "tp1-html-css-js",
    badge: "ETAPA 01",
    title: "Versión HTML, CSS y JavaScript",
    subtitle:
      "Primera versión del proyecto Coffee-Code Engine, desarrollada antes de la migración a React.",
    startNumber: 1,
    entries: [
      {
        id: "fase-inicial",
        title: "Inicio del proyecto y creación del repositorio",
        text: "Se revisó la consigna del trabajo práctico grupal de Front End y se definió el uso de <strong>HTML, CSS y JavaScript puro</strong>. Se organizó el repositorio en GitHub para el trabajo colaborativo.",
      },
      {
        id: "propuesta-creativa",
        title: "Definición de la propuesta creativa",
        text: 'El equipo definió el concepto: una cafetería ficticia integrada por <strong>"baristas-devs"</strong>. Se combinaron elementos del café con el entorno tecnológico.',
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
        text: "Se utilizó <strong>IA</strong> para generar avatares coherentes y diseñar un logo integrando granos de café con símbolos de código.",
      },
      {
        id: "dificultades-soluciones",
        title: "Dificultades encontradas y soluciones",
        text: "Se resolvieron problemas de rutas de archivos, extensiones de imágenes incorrectas y sincronización entre el <strong>data-id</strong> del HTML y el archivo JSON.",
      },
      {
        id: "colaboracion-github",
        title: "Integración de cambios y trabajo colaborativo",
        text: "El flujo de trabajo se basó en ramas, Pull Requests y revisiones constantes en GitHub.",
      },
      {
        id: "estado-actual-tp1",
        title: "Estado de cierre de la primera versión",
        text: "La primera versión quedó con identidad visual definida, páginas principales, fichas individuales, interacciones con JavaScript y una base estética para continuar en React.",
      },
    ],
  },
];

function LogEntry({ entry, number, total, visible }) {
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
      <span className={styles.entryNumber}>
        {String(number).padStart(2, "0")}
      </span>

      <div className={styles.entryHeader}>
        <span className={styles.entryTag}>{number}</span>
        <h2 className={styles.entryTitle}>
          <span className={styles.entryTitleAccent}>&gt;</span>
          {entry.title}
        </h2>
      </div>

      <p className={styles.entryText}>{renderText(entry.text)}</p>

      {entry.details && entry.details.length > 0 && (
        <ul className={styles.entryDetails}>
          {entry.details.map((detail, i) => (
            <li key={i} className={styles.entryDetail}>
              {renderText(detail)}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.entryFooter}>
        <span className={styles.entryMeta}>
          <IconCoffee size={11} stroke={1.5} />
          <span>
            Log <span className={styles.entryMetaAccent}>{number}</span> de{" "}
            {total}
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

function StageFooter({ stage }) {
  return (
    <div className={styles.stageHeader}>
      <span className={styles.stageBadge}>{stage.badge}</span>
      <h2 className={styles.stageTitle}>{stage.title}</h2>
      <p className={styles.stageSubtitle}>{stage.subtitle}</p>
    </div>
  );
}

export default function BitacoraPage() {
  const [visibleIds, setVisibleIds] = useState(new Set());
  const entryRefs = useRef({});

  const totalEntries = STAGES.reduce(
    (total, stage) => total + stage.entries.length,
    0,
  );

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

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.container}>
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
            Registro de evolución del proyecto Coffee-Code Engine: versión
            inicial y migración a React.
          </p>
          <div className={styles.headerDivider} />
        </header>

        {STAGES.map((stage) => {
          const reversedEntries = [...stage.entries].reverse();

          return (
            <section key={stage.id} className={styles.stageSection}>
              {reversedEntries.map((entry) => {
                const originalIndex = stage.entries.findIndex(
                  (item) => item.id === entry.id,
                );

                const number = stage.startNumber + originalIndex;

                return (
                  <div
                    key={entry.id}
                    ref={setEntryRef(entry.id)}
                    data-id={entry.id}
                  >
                    <LogEntry
                      entry={entry}
                      number={number}
                      total={totalEntries}
                      visible={visibleIds.has(entry.id)}
                    />
                  </div>
                );
              })}

              <StageFooter stage={stage} />
            </section>
          );
        })}
      </div>
    </section>
  );
}