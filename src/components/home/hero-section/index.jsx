import { useEffect, useRef } from "react";
import styles from "./hero-section.module.css";

const SYSTEM_LINES = [
  "[SYSTEM] : Iniciando the_coffe-code_engine.sh ...",
  "[SYSTEM] : Niveles de cafeína al 85 %",
  "[SYSTEM] : Listos para compilar",
];

const TYPEWRITER_TEXT =
  "$ > Transformamos granos de café en algoritmos y bugs en anécdotas.";

const LINE_DELAY_MS = 1200;
const LINE_FADE_MS = 800;
const TYPEWRITER_SPEED_MS = 50;
const POST_LINE_WAIT_MS = 1500;

export default function HeroSection() {
  // Refs para los elementos del DOM que manipula el efecto
  const logRef = useRef(null);
  const typewriterRef = useRef(null);
  const cursorLineRef = useRef(null);

  useEffect(() => {
    // Efecto secuencial de las líneas SYSTEM
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

    // Efecto máquina de escribir
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
          // Mostrar línea del cursor cuando termina
          cursorEl.style.display = "block";
        }
      }

      typeChar();
    }, totalLineDelay + POST_LINE_WAIT_MS);

    // Cleanup al desmontar
    return () => {
      clearTimeout(typewriterTimeout);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/*  Logo + CTA  */}
      <div className={styles.heroContent}>
        <div className={styles.heroLogoContainer}>
          <img
            src="./img/logo.png"
            alt="Logo The Coffee-Code Engine"
            className={styles.heroLogo}
          />
        </div>

        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>The Coffee-Code Engine</h1>
          <p className={styles.heroSubtitle}>
            Desarrollo de software con aroma a café tostado.
          </p>
          <div className={styles.heroActions}>
            <a href="#terminal" className={styles.btnPrimary}>
              Hacé tu pedido
            </a>
          </div>
        </div>
      </div>

      {/*  Terminal  */}
      <div className={styles.heroVisual}>
        <div className={styles.terminal}>
          {/* Barra superior */}
          <div className={styles.cardHeader}>
            <p>THE COFFE-CODE ENGINE</p>
            <p className={styles.fileName}>./main.js</p>
          </div>

          {/* Líneas de SYSTEM */}
          <div className={styles.terminalLog} ref={logRef}>
            {SYSTEM_LINES.map((text, idx) => (
              <p key={idx} className={styles.hiddenLine}>
                {text}
              </p>
            ))}
          </div>

          {/* Área de typewriter */}
          <div className={styles.terminalAccent}>
            <p ref={typewriterRef} id="typewriter-text"></p>
            <p ref={cursorLineRef} className={styles.cursorLine}>
              $ &gt; <span className={styles.terminalCursor}>|</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
