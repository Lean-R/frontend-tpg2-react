import style from "@components/profile/cardExtraInfo/CardExtraInfo.module.css"

const CardExtraInfo = ({data}) => {
    if (!data) return null;

    const{films, discs} = data;

    return (
                <div className={style.extra_info}>
                    
                    <div className={style.list_box}>
                        <h3>🎬 FILMS_LOG</h3>
                        <ul id="media-list">
                            {films && films.map((film) => (
                                <li 
                                    key={film.id}
                                    data-id={film.id}>
                                    {film.name}
                                </li>
                            ))}                          
                        </ul>
                    </div>

                    <div className={style.list_box}>
                        <h3>💿 DISCS_DRIVE</h3>
                        <ul id="audio-list">
                            {discs && discs.map((disc) => (
                                <li 
                                    key={disc.id}
                                    data-id={disc.id}>
                                    {disc.name}
                                </li>
                            ))} 
                        </ul>
                    </div>
                    <div id="barista-tooltip" className={style.tooltip_hidden}></div>
                    
                </div>
  )
}

export default CardExtraInfo