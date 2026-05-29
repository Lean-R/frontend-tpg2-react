import styles from "./TicketCard.module.css";
import { IconBrandGithub, IconClock } from "@tabler/icons-react";

/**  Formatea ISO → "DD/MM/AAAA HH:mm"  */
const formatDate = (iso) => {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${mins}`;
};

/*  Mapa semántico de colores de labels → colores del tema cafetería  */
const LABEL_COLORS = {
  bug: "#e74c3c",
  enhancement: "#2ecc71",
  documentation: "#3498db",
  feature: "#9b59b6",
  "good first issue": "#f39c12",
  "help wanted": "#1abc9c",
  question: "#e67e22",
  wontfix: "#95a5a6",
};

const getLabelStyle = (labelName, labelColor) => {
  const hex = LABEL_COLORS[labelName.toLowerCase()] || `#${labelColor}`;
  return {
    background: `${hex}22`,
    color: hex,
    borderColor: `${hex}55`,
  };
};

export default function TicketCard({ issue, repoName }) {
  const { title, labels, created_at, html_url, number } = issue;

  return (
    <article className={styles.ticket}>
      {/*  Línea punteada superior tipo ticket  */}
      <div className={styles.ticketPerforations} />

      {/*  Encabezado del ticket  */}
      <div className={styles.ticketHeader}>
        <div className={styles.ticketHeaderLeft}>
          <IconBrandGithub size={14} stroke={1.5} />
          <span className={styles.repoLabel}>{repoName}</span>
        </div>
        <span className={styles.ticketNumber}>#{number}</span>
      </div>

      {/*  Nombre del pedido (title)  */}
      <h3 className={styles.ticketTitle}>{title}</h3>

      {/*  Labels como "Aderezos"  */}
      {labels.length > 0 && (
        <div className={styles.labelsRow}>
          {labels.map((label) => (
            <span
              key={label.id || label.name}
              className={styles.labelTag}
              style={getLabelStyle(label.name, label.color)}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/*  Separador con zigzag  */}
      <div className={styles.ticketDivider}>
        <span className={styles.dividerSymbol}>{/* */}</span>
      </div>

      {/*  Pie del ticket  */}
      <div className={styles.ticketFooter}>
        <div className={styles.footerItem}>
          <IconClock size={12} stroke={1.5} />
          <span>{formatDate(created_at)}</span>
        </div>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ticketLink}
          onClick={(e) => e.stopPropagation()}
        >
          <IconBrandGithub size={12} stroke={1.5} />
          <span>Ver issue</span>
        </a>
      </div>
    </article>
  );
}
