import { useState, useEffect, useCallback } from "react";
import styles from "./workspace-gallery.module.css";

import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconZoomIn,
  IconZoomOut,
  IconCode,
} from "@tabler/icons-react";

const WORKSPACE_IMAGES = [
  {
    name: "Espacio Central",
    file: "workspace-1.png",
    alt: "Fachada del espacio de trabajo con cartel de neón",
    description:
      "Puerto 8080. Si el cartel de neón '<The Coffe-Code Engine />' está apagado, significa que se cayó el servidor o nos quedamos sin granos de Colombia.",
  },
  {
    name: "Estación de Café",
    file: "workspace-2.png",
    alt: "Barra de café de especialidad con herramientas de barista",
    description:
      "La Barra de Producción (Hotfix Bar). Donde ocurre la magia asíncrona: el café sale con menos errores que tu último push.",
  },
  {
    name: "Setup Dev",
    file: "workspace-3.png",
    alt: "Estación de trabajo con monitores y setup de desarrollo",
    description:
      "El Open Space (Zona de Loops). Escritorios ergonómicos, pantallas 4K y un gato que actúa como Senior Tech Lead. Si bosteza, se refactoriza.",
  },
  {
    name: "Tech Garden",
    file: "workspace-4.png",
    alt: "Patio exterior con plantas y área de descanso",
    description:
      "El Patio de Desconexión (acá no hay wifi). Un oasis verde ideal para llorar en silencio mientras esperas que termine el 'npm install'.",
  },
  {
    name: "The Merge Room",
    file: "workspace-5.png",
    alt: "Sala de reuniones con pizarra y mesa colaborativa",
    description:
      "Sala Daily Standup. Lugar de discusión grupal. Las reuniones duran estrictamente lo que tarda en enfriarse un Flat White.",
  },
  {
    name: "Sala de Máquinas",
    file: "workspace-6.png",
    alt: "Cuarto de servidores y máquina de tostado de café",
    description:
      "El Motor Central: Tostadora & Servidores. El verdadero backend de la empresa donde el calor de los racks mantiene calentitos los sacos de café.",
  },
  {
    name: "Espacio Chill",
    file: "workspace-7.png",
    alt: "Sillones y área de relajación con arcade",
    description:
      "Rincón Anti-Burnout. Sillones cómodos, libros que nadie lee porque usamos ChatGPT y un arcade para resolver conflictos con un duelo.",
  },
  {
    name: "Workstation",
    file: "workspace-8.png",
    alt: "Escritorio con teclado mecánico RGB y laptop",
    description:
      "Inyección de Cafeína Crítica. Teclado mecánico con luces RGB para escribir bugs más rápido y un arte latte que costó 3 intentos de renderizado.",
  },
];

/*  Ruta pública  */
const imageSrc = (file) => `./img/workspace/${file}`;

/*  Niveles de zoom: escala 1× → 3×  */
const ZOOM_LEVELS = [1, 1.5, 2, 2.5, 3];
const ZOOM_MIN = 0;
const ZOOM_MAX = ZOOM_LEVELS.length - 1;

export default function WorkspaceGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(ZOOM_MIN);

  const totalImages = WORKSPACE_IMAGES.length;

  /*  Handlers del Lightbox  */

  /** Abre el lightbox en el índice de la imagen clickeada */
  const openLightbox = useCallback((index) => {
    setActiveIndex(index);
    setZoomLevel(ZOOM_MIN);
    setIsOpen(true);
  }, []);

  /** Cierra el lightbox */
  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  /** Navega a la imagen anterior (cíclico) */
  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    setZoomLevel(ZOOM_MIN);
  }, [totalImages]);

  /** Navega a la imagen siguiente (cíclico) */
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    setZoomLevel(ZOOM_MIN);
  }, [totalImages]);

  /** Aumenta el zoom (hasta el máximo) */
  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 1, ZOOM_MAX));
  }, []);

  /** Disminuye el zoom (hasta el mínimo) */
  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 1, ZOOM_MIN));
  }, []);

  /*  ESC para cerrar el lightbox  */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "ArrowRight":
          goToNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    /*  Prevenir scroll del body mientras el lightbox está abierto  */
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeLightbox, goToPrev, goToNext]);

  /*  Render  */
  const activeImage = WORKSPACE_IMAGES[activeIndex];
  const currentZoom = ZOOM_LEVELS[zoomLevel];

  return (
    <section className={styles.gallerySection}>
      {/*  Encabezado  */}
      <h2 className={styles.sectionTitle}>&gt; Nuestro Espacio de Trabajo</h2>
      <p className={styles.sectionSubtitle}>
        Donde el código fluye entre taza y taza de café de especialidad
      </p>

      {/*  Grid de miniaturas  */}
      <div className={styles.grid}>
        {WORKSPACE_IMAGES.map((img, index) => (
          <div
            key={img.file}
            className={styles.card}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            aria-label={`Abrir imagen: ${img.name}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <img
              className={styles.thumbnail}
              src={imageSrc(img.file)}
              alt={img.alt}
              loading="lazy"
            />

            {/*  Overlay al hover  */}
            <div className={styles.cardOverlay}>
              <span className={styles.cardLabel}>
                <IconCode size={14} className={styles.cardLabelIcon} />
                {img.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${activeImage.name}`}
        >
          {/*  Contenedor que evita que clicks internos cierren el modal  */}
          <div
            className={styles.lightboxContainer}
            onClick={(e) => e.stopPropagation()}
          >
            {/*  Botón de cierre  */}
            <button
              className={styles.closeBtn}
              onClick={closeLightbox}
              aria-label="Cerrar lightbox"
              title="Cerrar (ESC)"
            >
              <IconX size={22} stroke={1.5} />
            </button>

            {/*  Flecha izquierda  */}
            <button
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={goToPrev}
              aria-label="Imagen anterior"
              title="Anterior (←)"
            >
              <IconChevronLeft size={22} stroke={1.5} />
            </button>

            {/*  Flecha derecha  */}
            <button
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={goToNext}
              aria-label="Imagen siguiente"
              title="Siguiente (→)"
            >
              <IconChevronRight size={22} stroke={1.5} />
            </button>

            {/*  Controles de zoom  */}
            <div className={styles.zoomControls}>
              <button
                className={styles.zoomBtn}
                onClick={zoomOut}
                disabled={zoomLevel === ZOOM_MIN}
                aria-label="Alejar"
                title="Alejar (-)"
              >
                <IconZoomOut size={18} stroke={1.5} />
              </button>
              <button
                className={styles.zoomBtn}
                onClick={zoomIn}
                disabled={zoomLevel === ZOOM_MAX}
                aria-label="Acercar"
                title="Acercar (+)"
              >
                <IconZoomIn size={18} stroke={1.5} />
              </button>
            </div>

            {/*  Imagen con zoom  */}
            <div className={styles.imageWrapper}>
              <img
                className={`${styles.lightboxImage} ${
                  zoomLevel > ZOOM_MIN ? styles.zoomed : ""
                }`}
                src={imageSrc(activeImage.file)}
                alt={activeImage.alt}
                style={{ transform: `scale(${currentZoom})` }}
                draggable={false}
              />
            </div>

            {/*  Descripción de la imagen (esquina inf-izquierda)  */}
            {activeImage.description && (
              <div className={styles.descOverlay}>
                <p className={styles.descText}>{activeImage.description}</p>
              </div>
            )}

            {/*  Contador e info  */}
            <div className={styles.lightboxInfo}>
              <span className={styles.lightboxCounter}>{activeIndex + 1}</span>
              <span> / {totalImages}</span>
              <span> &middot; </span>
              <span>{activeImage.name}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
