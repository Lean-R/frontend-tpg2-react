import { useState } from 'react';

import style from "@components/profile/cardExtraInfo/CardExtraInfo.module.css"

const CardExtraInfo = ({data}) => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        x:0,
        y:0,
        image:'',
        text:'',

    })

    const handleMouseHover = (e, item) => {
        const offsetX = -220;
        const offsetY = -220;
        setTooltip({
            visible: true,
            x: e.pageX + offsetX,
            y: e.pageY + offsetY,
            image: item.image,
            text: item.text
        });
    };

    const handleMouseLeave = () => {
        setTooltip((prev) => ({ ...prev, visible: false }));
    };

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
                                    data-id={film.id}
                                    onMouseEnter={(e) => handleMouseHover(e, film)}
                                    onMouseLeave={handleMouseLeave}
                                >
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
                                    data-id={disc.id}
                                    onMouseEnter={(e) => handleMouseHover(e, disc)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {disc.name}
                                </li>
                            ))} 
                        </ul>
                    </div>
                    {/* EL BARISTA TOOLTIP */}
                    {tooltip.visible && (
                        <div 
                            className={style.barista_tooltip} 
                            style={{ 
                                position: 'absolute', 
                                left: `${tooltip.x}px`, 
                                top: `${tooltip.y}px`,
                                display: 'flex' 
                            }}
                            >
                            <img src={tooltip.image} alt="Portada" className={style.tooltip_img} />
                            {/* Muestra la descripción de la cata de café */}
                            <p className={style.tooltip_text}>{tooltip.text}</p>
                        </div>
                    )}
                    
                </div>
  )
}

export default CardExtraInfo