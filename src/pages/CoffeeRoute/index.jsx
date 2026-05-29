import styles from "./CoffeeRoute.module.css";

import {
  IconCoffee,
  IconHierarchy2,
  IconListDetails,
  IconUser,
  IconTicket,
  IconStar,
  IconPhoto,
  IconMessage,
  IconMailForward,
  IconCode,
  IconLoader,
  IconRoute,
} from "@tabler/icons-react";

const TREE = {
  root: {
    name: "App",
    ext: ".jsx",
    icon: "☕",
    tooltip:
      "Grano Maestro: Acá se tuesta el estado global. Si se quema, explota producción.",
    role: "COMPONENTE RAÍZ",
  },
  topLevels: [
    {
      name: "Layout",
      ext: ".jsx",
      icon: "⚙️",
      tooltip:
        "Caldera de Presión: Distribuye el flujo de datos hacia la Sidebar, el Navbar y el contenido principal. Regula la temperatura del sistema.",
      role: "CALDERA",
      children: ["Header", "Aside", "Footer"],
    },
  ],
  midLevels: [
    {
      name: "Home",
      ext: ".jsx",
      icon: "📊",
      tooltip:
        "Dashboard en grano entero: Visualiza el resumen del estado de la cafetería, el equipo y el workspace.",
      role: "DASHBOARD",
      children: [
        "HeroSection",
        "TeamSection",
        "WorkspaceGallery",
        "MarqueeClientes",
        "ContactForm",
      ],
    },
    {
      name: "Fichas",
      ext: "(x4)",
      icon: "👤",
      tooltip:
        "Perfiles de Baristas: Cada ficha contiene la dosis exacta de café que necesita cada miembro del equipo para funcionar.",
      role: "PERFILES",
      children: ["Profile", "CardHeader", "CardContent", "CardExtraInfo"],
    },
    {
      name: "ProductionTickets",
      ext: ".jsx",
      icon: "🎫",
      tooltip:
        "Filtro de Extracción: Saca los issues puros de GitHub sin dejar pasar los residuos de los Pull Requests.",
      role: "COMANDAS",
      children: ["TicketCard", "TicketLoader"],
    },
    {
      name: "Bitácora",
      ext: ".jsx",
      icon: "📓",
      tooltip:
        "Registro de Tostado: Un diario de a bordo donde anotamos qué blends funcionaron y cuáles mandamos al descarte.",
      role: "LOGS",
    },
  ],
  leafComponents: [
    "Nav",
    "HeroSection",
    "TeamSection",
    "WorkspaceGallery",
    "MarqueeClientes",
    "ContactForm",
    "Profile",
    "CardHeader",
    "CardContent",
    "CardExtraInfo",
    "CardFooter",
    "TicketCard",
    "TicketLoader",
    "Footer",
  ],
};

const LEAF_TOOLTIPS = {
  Nav: "Barra de Navegación Superior: El menú del día. Acá se elige entre espresso, latte o correr git push --force.",
  HeroSection:
    "Molinillo de Café: Muele la introducción en grano grueso. La primera impresión que atrapa al cliente.",
  TeamSection:
    "Dosificador de Baristas: Muestra el equipo en posiciones de extracción. Cada uno tiene su receta.",
  WorkspaceGallery:
    "Ventana al Laboratorio: Galería de fotos del espacio donde los granos se convierten en código.",
  MarqueeClientes:
    "Cinta Transportadora de Reseñas: Los testimonios giran sin parar porque el café (y el código) nunca duermen.",
  ContactForm:
    "Comanda de Pedido: El formulario donde el cliente escribe su orden y nosotros decidimos el tiempo de extracción.",
  Profile:
    "Receta Personal: Cada barista tiene su perfil, sus estadísticas y su tolerancia a la cafeína documentada.",
  CardHeader:
    "Etiqueta del Envase: Muestra el nombre del blend y el origen del grano.",
  CardContent:
    "Cuerpo del Tueste: Contiene la información nutrimental del barista: skills, experiencia y foto de perfil.",
  CardExtraInfo:
    "Notas de Cata: Información extra que sólo un verdadero coffee lover sabe apreciar.",
  CardFooter:
    "Sello de Calidad: Los badges, certificaciones y el temido status 'en producción'.",
  TicketCard:
    "Espresso Simple: El ticket final que consume el desarrollador para no dormirse.",
  TicketLoader:
    "Indicador de Carga: La aguja del manómetro que sube y baja mientras la máquina calienta.",
  Footer:
    "Bandeja de Goteo: Todo lo que sobra después del proceso. Acá termina el recorrido del café.",
};

const LEAF_ICONS = {
  Nav: <IconCode size={16} />,
  HeroSection: <IconPhoto size={16} />,
  TeamSection: <IconStar size={16} />,
  WorkspaceGallery: <IconPhoto size={16} />,
  MarqueeClientes: <IconMessage size={16} />,
  ContactForm: <IconMailForward size={16} />,
  Profile: <IconUser size={16} />,
  CardHeader: <IconHierarchy2 size={16} />,
  CardContent: <IconListDetails size={16} />,
  CardExtraInfo: <IconListDetails size={16} />,
  CardFooter: <IconStar size={16} />,
  TicketCard: <IconTicket size={16} />,
  TicketLoader: <IconLoader size={16} />,
  Footer: <IconCoffee size={16} />,
};

const HEADER_TOOLTIPS = {
  Header:
    "Cabezal del Grupo: El header que contiene el Navbar. Como el portafiltro de la máquina.",
  Aside:
    "Válvula Lateral: El Sidebar fijo que redirige el flujo a las distintas secciones de la app.",
  Footer:
    "Bandeja de Goteo: El pie de página donde termina el recorrido del café.",
};

function SinglePipe() {
  return (
    <div className={styles.pipeSection}>
      <div className={styles.pipeVertical} />
    </div>
  );
}

function SplitPipe() {
  return (
    <div className={styles.pipeSection}>
      <div className={styles.pipeSplit} />
    </div>
  );
}

function BranchPipe() {
  return (
    <div className={styles.pipeSection}>
      <div className={styles.pipeBranch}>
        <div className={styles.pipeBranchJoint} />
        <div className={styles.pipeBranchJoint} />
        <div className={styles.pipeBranchJoint} />
      </div>
    </div>
  );
}

function LevelLabel({ text }) {
  return <div className={styles.levelLabel}>{text}</div>;
}

export default function CoffeeRoute() {
  /*  Renderiza un nodo individual  */
  const renderNode = (name, ext, tooltip, extraClass, icon, role) => (
    <div className={`${styles.node} ${extraClass || ""}`} key={name}>
      <div className={styles.tooltip}>
        {tooltip}
        <div className={styles.tooltipArrow} />
      </div>
      {icon && <span className={styles.nodeIcon}>{icon}</span>}
      <span className={styles.nodeName}>
        {name}
        {ext && <span className={styles.nodeExt}> {ext}</span>}
      </span>
      {role && <span className={styles.nodeRole}>{role}</span>}
    </div>
  );

  const renderLeaf = (name) =>
    renderNode(
      name,
      "",
      LEAF_TOOLTIPS[name] || "Componente hoja del árbol de extracción.",
      styles.nodeLeaf,
      LEAF_ICONS[name] || null,
    );

  return (
    <section className={styles.page}>
      {/*  Encabezado  */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          <IconRoute
            size={24}
            stroke={1.5}
            style={{ marginRight: 8, verticalAlign: "middle" }}
          />
          La Ruta del Café
        </h1>
        <p className={styles.headerSubtitle}>
          Circuito de Extracción — Árbol de Renderizado de la aplicación.
          Observá cómo el café (los datos) fluye desde el grano maestro hasta la
          taza final.
        </p>
      </div>

      <hr className={styles.divider} />

      {/*  Árbol  */}
      <div className={styles.tree}>
        {/* ======== NIVEL 1: RAÍZ ======== */}
        <div className={`${styles.level} ${styles.levelRoot}`}>
          {renderNode(
            TREE.root.name,
            TREE.root.ext,
            TREE.root.tooltip,
            styles.nodeRoot,
            TREE.root.icon,
            TREE.root.role,
          )}
        </div>

        <SinglePipe />

        {/* ======== NIVEL 2: LAYOUT (Caldera) ======== */}
        <LevelLabel text="Caldera de Presión" />
        <div className={`${styles.level} ${styles.levelTop}`}>
          {TREE.topLevels.map((lvl) => (
            <div key={lvl.name} className={styles.subGroup}>
              {renderNode(
                lvl.name,
                lvl.ext,
                lvl.tooltip,
                styles.nodeTop,
                lvl.icon,
                lvl.role,
              )}
              <div className={styles.subGroup}>
                {lvl.children.map((child) =>
                  renderNode(
                    child,
                    ".jsx",
                    HEADER_TOOLTIPS[child] || "",
                    styles.nodeLeaf,
                    child === "Header" ? "📋" : child === "Aside" ? "🧭" : "🖼️",
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <BranchPipe />

        {/* ======== NIVEL 3: PÁGINAS (Tuberías de Distribución) ======== */}
        <LevelLabel text="Tuberías de Distribución" />
        <div className={`${styles.level} ${styles.levelMid}`}>
          {TREE.midLevels.map((page) => (
            <div key={page.name} className={styles.subGroup}>
              {renderNode(
                page.name,
                page.ext,
                page.tooltip,
                styles.nodeMid,
                page.icon,
                page.role,
              )}
              {page.children && (
                <div className={styles.subGroup}>
                  {page.children.map((child) => renderLeaf(child))}
                </div>
              )}
            </div>
          ))}
        </div>

        <SplitPipe />

        {/* ======== NIVEL 4: COMPONENTES HOJA SUELTOS ======== */}
        <LevelLabel text="Tazas Servidas" />
        <div className={`${styles.level} ${styles.levelLeaf}`}>
          {TREE.leafComponents
            .filter(
              (name) =>
                !TREE.midLevels.some((p) => p.children?.includes(name)) &&
                !TREE.topLevels.some((t) => t.children?.includes(name)),
            )
            .map((name) => renderLeaf(name))}
        </div>
      </div>

      {/*  Leyenda  */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.legendDotRoot}`} />
          <span>Grano Maestro (Raíz)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.legendDotTop}`} />
          <span>Caldera (Layout)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.legendDotMid}`} />
          <span>Distribución (Páginas)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.legendDotLeaf}`} />
          <span>Tazas (Componentes hoja)</span>
        </div>
      </div>
    </section>
  );
}
