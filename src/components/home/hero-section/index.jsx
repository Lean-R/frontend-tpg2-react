import { useEffect, useRef, useState } from "react";
import styles from "./hero-section.module.css";
import { IconCoffee, IconChevronRight } from "@tabler/icons-react";

const SYSTEM_LINES = [
  "[SYSTEM] : Iniciando the_coffee-code_engine.sh ...",
  "[SYSTEM] : Niveles de cafeína al 85 %",
  "[SYSTEM] : Compilando entorno de desarrollo...",
  "[SYSTEM] : Conexión con granos de Colombia establecida",
  "[SYSTEM] : Listos para compilar",
];

const TYPEWRITER_TEXT =
  "$ > Transformamos granos de café en algoritmos y bugs en anécdotas.";

const LINE_DELAY_MS = 800;
const LINE_FADE_MS = 600;
const TYPEWRITER_SPEED_MS = 45;
const POST_LINE_WAIT_MS = 1200;

export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState("");

  const logRef = useRef(null);
  const typewriterRef = useRef(null);
  const cursorLineRef = useRef(null);

  /*  Reloj en tiempo real  */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  /*  Efecto secuencial de líneas + typewriter  */
  useEffect(() => {
    const lineElements =
      logRef.current?.querySelectorAll(`.${styles.hiddenLine}`) ?? [];
    let lineDelay = 0;

    lineElements.forEach((line, index) => {
      lineDelay = index * LINE_DELAY_MS;

      setTimeout(() => {
        line.classList.add(styles.showLine);

        setTimeout(() => {
          line.classList.add(styles.lineFaded);
        }, LINE_FADE_MS);
      }, lineDelay);
    });

    const typewriterEl = typewriterRef.current;
    const cursorEl = cursorLineRef.current;
    const totalLineDelay = lineDelay;

    const typewriterTimeout = setTimeout(() => {
      let charIndex = 0;

      function typeChar() {
        if (charIndex < TYPEWRITER_TEXT.length) {
          typewriterEl.textContent += TYPEWRITER_TEXT.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, TYPEWRITER_SPEED_MS);
        } else {
          cursorEl.style.display = "block";
        }
      }

      typeChar();
    }, totalLineDelay + POST_LINE_WAIT_MS);

    return () => {
      clearTimeout(typewriterTimeout);
    };
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/*  Columna izquierda — Logo + Texto  */}
      <div className={styles.heroContent}>
        <div className={styles.heroLogoContainer}>
          <img
            src="./img/logo.png"
            alt="Logo The Coffee-Code Engine"
            className={styles.heroLogo}
          />
        </div>

        <div className={styles.heroTextContainer}>
          <span className={styles.heroBadge}>
            <IconCoffee
              size={12}
              stroke={2}
              style={{ marginRight: 4, verticalAlign: "middle" }}
            />
            ESPECIALTY COFFEE & CODE
          </span>

          <h1 className={styles.heroTitle}>The Coffee-Code Engine</h1>

          <p className={styles.heroSubtitle}>
            Desarrollo de software con aroma a café tostado. Mezclamos granos de
            especialidad con algoritmos de última generación para crear
            experiencias digitales únicas.
          </p>

          <div className={styles.heroActions}>
            <a href="#contact" className={styles.btnPrimary}>
              <IconCoffee size={18} stroke={2} />
              Hacé tu pedido
            </a>
            <a href="#source" className={styles.btnGhost}>
              Conocé al equipo
              <IconChevronRight size={14} stroke={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/*  Columna derecha — Terminal  */}
      <div className={styles.heroVisual}>
        <div className={styles.terminal}>
          {/*  Barra superior  */}
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderTitle}>
              <IconCoffee size={14} stroke={2} />
              THE COFFEE-CODE ENGINE
            </span>
            <span className={styles.cardHeaderTime}>{currentTime}</span>
          </div>

          {/*  Cuerpo  */}
          <div className={styles.terminalBody}>
            <div className={styles.terminalLog} ref={logRef}>
              {SYSTEM_LINES.map((text, idx) => (
                <p key={idx} className={styles.hiddenLine}>
                  {text}
                </p>
              ))}
            </div>

            <div className={styles.terminalAccent}>
              <p ref={typewriterRef} id="typewriter-text" />
              <p ref={cursorLineRef} className={styles.cursorLine}>
                $ <span className={styles.terminalCursor}>|</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
