import styles from '@components/profile/cardContent/CardContent.module.css'
import TechStack from '@components/profile/TechStack'
import SocialMedia from '@components/profile/SocialMedia'

const CardContent = ({
    data,
    onExecAction,
    preparadasCount,
    servidasCount
}) => {
    if (!data) return null;

    const {
        name,
        profile_img,
        role,
        ageInfo,
        origin,
        recipe,
        workingWay,
        skills,
        btnPreparar,
        btnServir
    } = data;

    return (
        <>
            <div className={styles.card_content}>
                <div className={styles.photo_section}>
                    <div className={styles.photo_frame}>
                        <img
                            src={profile_img}
                            alt={`${name}, ${role}`}
                            className={styles.profile_img}
                        />
                    </div>

                    <h1>{name}</h1>
                    <p className={styles.role_title}>{role}</p>
                    <p className={styles.role_title}>
                        Edad: {ageInfo}
                    </p>
                    <p className={styles.role_title}>
                        Sucursal de Origen: {origin}
                    </p>

                    <div className={styles.roast_controls}>
                        <button
                            id="btn-preparar"
                            className={styles.btn_roast}
                            onClick={() => onExecAction?.('preparar')}
                        >
                            {btnPreparar}
                        </button>

                        <div className={styles.coffee_stats_mini}>
                            <div className={styles.stat_item}>
                                <label>PREPARADOS:</label>
                                <span id="count-preparadas">
                                    {preparadasCount ?? 0}
                                </span>
                                <p>tazas de café y sumando...</p>
                            </div>

                            <div className={styles.stat_item}>
                                <label>SERVIDOS:</label>
                                <span id="count-servidas">
                                    {servidasCount ?? 0}
                                </span>
                                <p>bugs resueltos y servidos...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.info_section}>
                    <div className={styles.info_group}>
                        <label>MI RECETA DE CÓDIGO:</label>
                        <p>{recipe}</p>
                    </div>

                    <div className={styles.info_group}>
                        <label>
                            INGREDIENTES TÉCNICOS (SKILLS):
                        </label>

                        <ul className={styles.skill_tags}>
                            {skills &&
                                skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className={styles.skill_item}
                                    >
                                        <div
                                            className={styles.skill_info}
                                        >
                                            <span>
                                                {skill.name}{' '}
                                                {skill.level}%
                                            </span>
                                        </div>

                                        <div
                                            className={
                                                styles.progress_bar_bg
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.progress_bar_fill
                                                }
                                                style={{
                                                    '--progress-width':
                                                        `${skill.level}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </ul>
                    </div>

                    <div className={styles.info_group}>
                        <label>
                            MI FORMA DE TRABAJAR:
                        </label>

                        <p>{workingWay}</p>

                        <button
                            id="btn-servir"
                            className={`${styles.btn_roast} ${styles.btn_secondary}`}
                            onClick={() => onExecAction?.('servir')}
                        >
                            {btnServir}
                        </button>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <TechStack data={data} />

            {/* Social Media */}
            <SocialMedia data={data} />
        </>
    );
};

export default CardContent;