import { useState, useEffect } from "react";
import styles from "./MarqueeClientes.module.css";

const REVIEWS = [
  "El Flat White de esta gente mantiene vivo mi entorno de staging. 5/5",
  "Excelente café y un código tan limpio que da gusto. Mi refactorización favorita. 5/5",
  "Producción no se cayó desde que compramos los granos de origen TypeScript. 4.8/5",
  "Un espresso tan potente como su pipeline de CI/CD. Nunca falla. 5/5",
  "Tomamos un Cold Brew mientras hacían code review. Aprobamos a la primera. 4.5/5",
  "El blend de Etiopía y Java que recomiendan viene con tests incluidos. 5/5",
  "Resolvieron un bug crítico con un latte art de por medio. Maestros del debug. 4.9/5",
  "Hicieron deploy un viernes a las 18:00 y todo salió bien. Eso solo pasa con este café. 4.7/5",
  "El aroma del espresso me recordó a la primera vez que vi un monorepo bien estructurado. 5/5",
  "Contratamos su cafetería y nuestro response time bajó un 40%. Magia tostada. 5/5",
  "Un American Black que corre en producción como si fuera desarrollo local. Perfecto. 4.8/5",
  "El WiFi acá es tan rápido como su batch de café recién molido. Ideal para pair programming. 4.6/5",
  "Pedimos un cortado y nos trajeron una solución cloud-native. Increíble servicio. 5/5",
  "Desde que tomo el blend 'Full-Stack Roast' mis PRs se aprueban solos. 4.9/5",
  "Tomamos un café de especialidad mientras migraban la base de datos. Cero downtime. 5/5",
  "El Cappuccino viene con un QR al repositorio. Hasta el arte latte tiene versionado. 4.7/5",
  "Un café que sabe a código limpio y buenas prácticas. Mejor que cualquier linter. 5/5",
  "Hicieron hotfix de emergencia con un espresso en mano. Código sólido, café impecable. 4.8/5",
  "Pedimos catering para el hackathon y todos los proyectos llegaron a producción. 5/5",
  "El grano de origen 'Commit & Brew' ya es parte de nuestra daily standup. 4.9/5",
];

/**  Genera una calificación de 4.0 a 5.0 en escalas de 0.1  */
const parseRating = (text) => {
  const match = text.match(/(\d\.?\d?)\/5/);
  return match ? parseFloat(match[1]) : 5;
};

/*  Renderiza estrellas llenas y vacías  */
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const decimal = rating - full;
  const total = 5;
  const stars = [];

  for (let i = 0; i < total; i++) {
    if (i < full) {
      stars.push(
        <span key={i} className={styles.starFilled}>
          ★
        </span>,
      );
    } else if (i === full && decimal >= 0.3) {
      stars.push(
        <span key={i} className={styles.starFilled}>
          ★
        </span>,
      );
    } else {
      stars.push(
        <span key={i} className={styles.starEmpty}>
          ★
        </span>,
      );
    }
  }

  return stars;
};

/**  Separa el rating del texto de la reseña */
const cleanReview = (text) => text.replace(/\s*\d\.?\d?\/5\s*$/, "");

export default function MarqueeClientes() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /*  Fetch a Random User API  */
  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://randomuser.me/api/?results=12&seed=devcafe2026&inc=name,location,picture",
        );

        if (!res.ok) throw new Error("Error al obtener clientes");

        const data = await res.json();
        if (!cancelled) setUsers(data.results);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  /*  Construir items combinando usuario + reseña  */
  const items = users.map((user, idx) => ({
    id: user.login?.uuid || idx,
    name: `${user.name.first} ${user.name.last}`,
    country: user.location.country,
    picture: user.picture.medium,
    review: REVIEWS[idx % REVIEWS.length],
    rating: parseRating(REVIEWS[idx % REVIEWS.length]),
  }));

  /*  Skeleton cards  */
  const skeletonCards = Array.from({ length: 6 }, (_, i) => (
    <div key={`skel-${i}`} className={styles.skeletonCard}>
      <div className={styles.cardHeader}>
        <div className={styles.avatarSkeleton} />
        <div>
          <div
            className={`${styles.skeletonLine} ${styles.skeletonLineMedium}`}
          />
          <div
            className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}
            style={{ marginTop: 6 }}
          />
        </div>
      </div>
      <div
        className={`${styles.skeletonLine} ${styles.skeletonLineFull}`}
        style={{ marginTop: 4 }}
      />
      <div
        className={`${styles.skeletonLine} ${styles.skeletonLineFull}`}
        style={{ marginTop: 2 }}
      />
      <div
        className={`${styles.skeletonLine} ${styles.skeletonLineMedium}`}
        style={{ marginTop: 2 }}
      />
      <div className={styles.skeletonStars}>
        {Array.from({ length: 5 }, (_, j) => (
          <div key={j} className={styles.skeletonStar} />
        ))}
      </div>
    </div>
  ));

  /*  Card individual  */
  const renderCard = (item) => (
    <div key={item.id} className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          className={styles.avatar}
          src={item.picture}
          alt={`Foto de ${item.name}`}
          loading="lazy"
        />
        <div>
          <p className={styles.cardName}>
            {item.name}
            <span className={styles.cardBranch}>Sucursal: {item.country}</span>
          </p>
        </div>
      </div>

      <p className={styles.reviewText}>"{cleanReview(item.review)}"</p>

      <div className={styles.starsRow}>
        {renderStars(item.rating)}
        <span className={styles.starRating}>{item.rating.toFixed(1)}</span>
      </div>
    </div>
  );

  return (
    <section className={styles.section}>
      {/*  Encabezado  */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          &gt; Clientes Frecuentes / Regulars
        </h2>
        <p className={styles.sectionSubtitle}>
          Lo que dicen quienes siempre vuelven
        </p>
        <div className={styles.sectionDivider} />
      </div>

      {/*  Cinta infinita  */}
      <div className={styles.marqueeContainer}>
        {loading || error ? (
          <div className={styles.track}>
            {/*  En loading/error mostramos skeletons duplicados  */}
            {skeletonCards}
            {skeletonCards}
          </div>
        ) : (
          <div className={styles.track}>
            {items.map(renderCard)}
            {items.map(renderCard)}
          </div>
        )}
      </div>
    </section>
  );
}
