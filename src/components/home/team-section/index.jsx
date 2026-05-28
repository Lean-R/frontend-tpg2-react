import styles from "./team-section.module.css";

const TEAM_MEMBERS = [
  {
    name: "Lean Backend Brewer",
    role: "Lead Barista Backend",
    img: "./img/backend-dev.jpg",
    alt: "Avatar Backend Dev",
    profileHref: "backend-dev.html",
  },
  {
    name: "Naty Coffee Debugger",
    role: "QA Taster & Latte Art Artist",
    img: "./img/qa-tester.jpg",
    alt: "Avatar QA Dev",
    profileHref: "qa-taster-frontend-latte-artist.html",
  },
  {
    name: "Luma Blend Maker",
    role: "Full-Stack Roaster",
    img: "./img/fsr-crop.png",
    alt: "Avatar Full-Stack Dev",
    profileHref: "full-stack-roaster.html",
  },
  {
    name: "Dany Deploy Keeper",
    role: "DevOps Supply Chain Manager",
    img: "./img/devops-supply.jpg",
    alt: "Avatar DevOps Dev",
    profileHref: "devops-supply-chain.html",
  },
];

export default function TeamSection() {
  /*  Click en nombre del miembro: efecto glow temporal  */
  const handleMemberClick = (e) => {
    const el = e.currentTarget;
    el.style.color = "var(--color-acento-secundario)";
    el.style.textShadow = "0 0 10px var(--color-acento-secundario)";

    setTimeout(() => {
      el.style.color = "";
      el.style.textShadow = "";
    }, 1500);
  };

  /*  Click en botón de perfil: feedback visual + navegación  */
  const handleProfileClick = (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const url = btn.getAttribute("href");

    btn.style.transform = "scale(0.95)";

    setTimeout(() => {
      window.location.href = url;
    }, 500);
  };

  return (
    <section id="source" className={styles.teamSection}>
      <h2 className={styles.sectionTitle}>Nuestro Equipo: Barista-Devs</h2>
      <p className={styles.sectionSubtitle}>
        Expertos en mezclar cafeína y código
      </p>

      <div className={styles.teamGrid}>
        {TEAM_MEMBERS.map((member, idx) => (
          <div className={styles.idCard} key={idx}>
            <img
              src={member.img}
              alt={member.alt}
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay}>
              <h3
                className={styles.memberName}
                data-team-member
                onClick={handleMemberClick}
              >
                {member.name}
              </h3>
              <p className={styles.memberRole}>{member.role}</p>
              <a
                href={member.profileHref}
                className={styles.btnProfile}
                onClick={handleProfileClick}
              >
                [ Cargar Perfil ]
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
