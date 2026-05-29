import styles from '@components/profile/cardContent/CardContent.module.css'

const CardContent = ({data, onExecAction, preparadasCount, servidasCount}) => {
    if(!data) return null;

    const {name, profile_img, role, ageInfo, origin, recipe, workingWay, skills, btnPreparar, btnServir} = data;
  
    return (
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
                        <p className={styles.role_title}>Edad: {ageInfo}</p>
                        <p className={styles.role_title}>Sucursal de Origen: {origin}</p>

                        <div className={styles.roast_controls}>
                            <button id="btn-preparar" className={styles.btn_roast} onClick={() => onExecAction('preparar')}>
                                {btnPreparar}
                            </button>

                            <div className={styles.coffee_stats_mini}>
                                <div className={styles.stat_item}>
                                    <label>PREPARADOS:</label>
                                    <span id="count-preparadas">{preparadasCount}</span>
                                    <p>tazas de café y sumando...</p>
                                </div>
                                <div className={styles.stat_item}>
                                    <label>SERVIDOS:</label>
                                    <span id="count-servidas">{servidasCount}</span>
                                    <p>bugs resueltos y servidos...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.info_section}>
                        <div className={styles.info_group}>
                            <label>MI RECETA DE CÓDIGO:</label>
                            <p>
                                {recipe}
                            </p>
                        </div>
                        <div className={styles.info_group}>
                            <label>INGREDIENTES TÉCNICOS (SKILLS):</label>
                            <ul className={styles.skill_tags}>
                                {skills && skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.info_group}>
                            <label>MI FORMA DE TRABAJAR:</label>
                            <p>
                                {workingWay}
                            </p>
                            <button id="btn-servir" className={`${styles.btn_roast} ${styles.btn_secondary}`} onClick={() => onExecAction('servir')}>
                                {btnServir}
                            </button>
                        </div>
                    </div>
                </div>
  )
}

export default CardContent