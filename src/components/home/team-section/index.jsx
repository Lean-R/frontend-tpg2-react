import { useNavigate } from "react-router-dom";
import styles from "./team-section.module.css";

const TEAM_MEMBERS = [
  {
    name: "Lean Backend Brewer",
    role: "Lead Barista Backend",
    img: "./img/backend-dev.jpg",
    alt: "Avatar Backend Dev",
    profileHref: "/ficha-lean",
  },
  {
    name: "Naty Coffee Debugger",
    role: "QA Taster & Latte Art Artist",
    img: "./img/qa-tester.jpg",
    alt: "Avatar QA Dev",
    profileHref: "/ficha-naty",
  },
  {
    name: "Luma Blend Maker",
    role: "Full-Stack Roaster",
    img: "./img/fsr-crop.png",
    alt: "Avatar Full-Stack Dev",
    profileHref: "/ficha-luma",
  },
  {
    name: "Dany Deploy Keeper",
    role: "DevOps Supply Chain Manager",
    img: "./img/devops-supply.jpg",
    alt: "Avatar DevOps Dev",
    profileHref: "/ficha-dani",
  },
];

export default function TeamSection() {
  const navigate = useNavigate();

  const handleMemberClick = (e) => {
    const el = e.currentTarget;
    el.style.color = "var(--color-acento-secundario)";
    el.style.textShadow = "0 0 10px var(--color-acento-secundario)";

    setTimeout(() => {
      el.style.color = "";
      el.style.textShadow = "";
    }, 1500);
  };

  const handleProfileClick = (url) => {
    navigate(url);
  };

  return (
    <section id="source" className={styles.teamSection}>
      <h2 className={styles.sectionTitle}>{"> Nuestro Equipo: Barista-Devs"}</h2>

      <p className={styles.sectionSubtitle}>
        Expertos en mezclar cafeína y código
      </p>

      <div className={styles.teamGrid}>
        {TEAM_MEMBERS.map((member) => (
          <article className={styles.idCard} key={member.profileHref}>
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

              <button
                type="button"
                className={styles.btnProfile}
                onClick={() => handleProfileClick(member.profileHref)}
              >
                [ Cargar Perfil ]
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
