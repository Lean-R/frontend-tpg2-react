import { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';

const ProjectCarousel = ({ data }) => {
 
  const { projects } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Función para limpiar el temporizador activo
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Efecto para el avance automático (cada 5 segundos)
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout(); 
    };
  }, [currentIndex, projects.length]);

  // Controles manuales
  const handlePrev = () => {
    resetTimeout();
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    resetTimeout();
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };
  if (!data || !data.projects) {
    return null; 
  }
  const currentProject = projects[currentIndex];

  return (
    <section className={styles.carousel_section}>
      <h3 className={styles.carousel_title}>💻 ROASTED_PROJECTS_LOG</h3>
      
      <div className={styles.carousel_container}>
        {/* Botón Izquierdo */}
        <button className={styles.nav_btn} onClick={handlePrev}>
          {"<<"}
        </button>

        {/* Ventana del Proyecto Activo */}
        <div className={styles.project_card}>
          <div className={styles.card_header}>
            <span className={styles.project_number}>
              PROJ_0{currentIndex + 1} // 0{projects.length}
            </span>
            <span className={styles.status_tag}>ACTIVE_EXTRACTION</span>
          </div>

          <div className={styles.card_content_wrapper}>
            
            {/* 1. AGREGAMOS LA IMAGEN DINÁMICA AQUÍ */}
            {currentProject.img && (
              <div className={styles.project_img_container}>
                <img 
                  src={currentProject.img} 
                  alt={`Screenshot de ${currentProject.title}`} 
                  className={styles.project_img} 
                />
              </div>
            )}

            <div className={styles.card_body}>
              <h4>{currentProject.title}</h4>
              <p className={styles.description}>{currentProject.description}</p>
              <div className={styles.tags_container}>
                {currentProject.tags.map((tag, index) => (
                  <span key={index} className={styles.tag_item}>
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

          </div>{/* fin contentWrapper*/}

          <div className={styles.card_footer}>
            <a 
              href={currentProject.web} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.code_link}
            >
              {">> view_source_code"}
            </a>
          </div>
        </div>

        {/* Botón Derecho */}
        <button className={styles.nav_btn} onClick={handleNext}>
          {">>"}
        </button>
      </div>

      {/* Indicadores de posición (Puntitos/Líneas inferiores) */}
      <div className={styles.indicators}>
        {projects.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator_dot} ${
              index === currentIndex ? styles.active_dot : ""
            }`}
            onClick={() => {
              resetTimeout();
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </section>
  );
};
export default ProjectCarousel;