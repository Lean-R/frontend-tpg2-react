import { useState, useEffect } from "react";
import styles from "./ProductionTickets.module.css";

import TicketCard from "@components/TicketCard";
import TicketLoader from "@components/TicketLoader";

import {
  IconTicket,
  IconCoffeeOff,
  IconRefresh,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

const REPOS = [
  { owner: "facebook", repo: "react", label: "React" },
  { owner: "microsoft", repo: "typescript", label: "TypeScript" },
  { owner: "microsoft", repo: "vscode", label: "VS Code" },
  { owner: "oven-sh", repo: "bun", label: "Bun" },
  { owner: "warpdotdev", repo: "warp", label: "Warp" },
];

const PER_PAGE = 6;

/*  Helper: formatear nombre para mostrar  */
const formatRepoName = (owner, repo) => `${owner}/${repo}`;

/*  Construye la URL de la API  */
const buildUrl = (owner, repo, pageNum) => {
  const query = encodeURIComponent(
    `repo:${owner}/${repo} type:issue state:open`,
  );
  return `https://api.github.com/search/issues?q=${query}&page=${pageNum}&per_page=${PER_PAGE}`;
};

/*  Parseo de mensajes de error según status */
const parseError = (status) => {
  if (status === 403)
    return "La máquina de espresso está en mantenimiento por límite de requests. ¡Tomate un break y volvé a intentar en unos minutos!";
  if (status === 404)
    return "Este origen de grano no existe o no está disponible. Probá con otro tostado.";
  return "Error al cargar los pedidos. La cocina tuvo un problema inesperado.";
};

export default function ProductionTickets() {
  /*  Estados  */
  const [activeRepo, setActiveRepo] = useState(REPOS[0]);
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  const hasMore = issues.length === PER_PAGE;

  /*  Efecto: carga cada vez que cambia repo o página  */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          buildUrl(activeRepo.owner, activeRepo.repo, page),
        );

        if (!res.ok) throw new Error(parseError(res.status));

        const data = await res.json();

        const realIssues = data.items || [];

        if (!cancelled) setIssues(realIssues);
      } catch (err) {
        if (!cancelled) setError(err.message);
        if (!cancelled) setIssues([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [activeRepo, page, retryKey]);

  /*  Handlers  */
  const handleRepoChange = (repo) => {
    setActiveRepo(repo);
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setPage((p) => p + 1);
  };

  const handleRetry = () => {
    setRetryKey((k) => k + 1);
  };

  /*  Render: estado de error  */
  const renderError = () => (
    <div className={styles.errorBox}>
      <IconCoffeeOff className={styles.errorIcon} stroke={1.5} />
      <h3 className={styles.errorTitle}>¡La espresso está en mantenimiento!</h3>
      <p className={styles.errorDesc}>{error}</p>
      <button className={styles.retryBtn} onClick={handleRetry}>
        <IconRefresh
          size={14}
          stroke={1.5}
          style={{ marginRight: 6, verticalAlign: "middle" }}
        />
        REINTENTAR
      </button>
    </div>
  );

  /*  Render: estado de carga  */
  const renderLoading = () => <TicketLoader />;

  /*  Render: datos  */
  const renderData = () => (
    <>
      <div className={styles.grid}>
        {issues.map((issue) => (
          <TicketCard
            key={issue.id}
            issue={issue}
            repoName={formatRepoName(activeRepo.owner, activeRepo.repo)}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={handlePrevPage}
          disabled={page === 1}
          aria-label="Página anterior"
        >
          <IconChevronLeft size={14} stroke={1.5} />
          Anterior
        </button>

        <span className={styles.pageIndicator}>
          Ticket <strong>{(page - 1) * PER_PAGE + 1}</strong>
          {" — "}
          <strong>{(page - 1) * PER_PAGE + issues.length}</strong>
          {" de "}
          <strong>
            {hasMore
              ? `${page * PER_PAGE}+`
              : page * PER_PAGE - (PER_PAGE - issues.length)}
          </strong>
        </span>

        <button
          className={styles.pageBtn}
          onClick={handleNextPage}
          disabled={!hasMore}
          aria-label="Página siguiente"
        >
          Siguiente
          <IconChevronRight size={14} stroke={1.5} />
        </button>
      </div>
    </>
  );

  /*  Render: estado vacío  */
  const renderEmpty = () => (
    <div className={styles.errorBox}>
      <IconCoffeeOff className={styles.errorIcon} stroke={1.5} />
      <h3 className={styles.errorTitle}>Sin pedidos en preparación</h3>
      <p className={styles.errorDesc}>
        Este origen de grano no tiene tickets abiertos en este momento. ¡Probá
        con otro tostado!
      </p>
    </div>
  );

  /* Render principal */
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTitleGroup}>
            <h1 className={styles.pageTitle}>
              <IconTicket
                size={24}
                stroke={1.5}
                style={{ marginRight: 8, verticalAlign: "middle" }}
              />
              Tickets en Preparación
            </h1>
            <p className={styles.pageSubtitle}>
              Comandas en las que se encuentra trabajando actualmente el equipo
              de barista-devs
            </p>
          </div>

          <div className={styles.repoSelector}>
            <span className={styles.repoSelectorLabel}>Origen de Grano</span>
            {REPOS.map((r) => (
              <button
                key={`${r.owner}/${r.repo}`}
                className={`${styles.repoBtn} ${
                  activeRepo.owner === r.owner && activeRepo.repo === r.repo
                    ? styles.repoBtnActive
                    : ""
                }`}
                onClick={() => handleRepoChange(r)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {loading && renderLoading()}
      {!loading && error && renderError()}
      {!loading && !error && issues.length === 0 && renderEmpty()}
      {!loading && !error && issues.length > 0 && renderData()}
    </section>
  );
}
