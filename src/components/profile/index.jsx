//Dependencias
import { useState } from 'react';

//Estilos
import style from './Profile.module.css'

//Componentes
import CardHeader from './cardHeader';
import CardContent from './cardContent';
import CardExtraInfo from './cardExtraInfo';
import CardFooter from './cardFooter';
import ModalTerminal from './modalTerminal';
import ProjectCarousel  from './carousel';


const Profile = ({data}) => {
   
    const [actionType, setActionType] = useState('preparar'); // 'preparar' o 'servir'

    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
    //Busca los estados de los contadores en el localstorage
    const [preparadas, setPreparadas] = useState(() => {
      return Number(localStorage.getItem(`${data.name}_preparadas`)) || 0;
    });
    
    const [servidas, setServidas] = useState(() => {
      return Number(localStorage.getItem(`${data.name}_servidas`)) || 0;
    });

    if (!data) return null;

    const handleOpenTerminal = (type) => {
        setActionType(type);
        setIsTerminalOpen(true);

        if (type === 'preparar') {
          const nuevoValor = preparadas + 1;
          setPreparadas(nuevoValor); // Actualiza la pantalla en React
          localStorage.setItem(`${data.name}_preparadas`, nuevoValor); // Lo guarda en el navegador
        } else if (type === 'servir') {
          const nuevoValor = servidas + 1;
          setServidas(nuevoValor); // Actualiza la pantalla en React
          localStorage.setItem(`${data.name}_servidas`, nuevoValor); // Lo guarda en el navegador
        }

    };
    

  return (
    <div className={style.profile_body}>
        <div className={style.id_card}>
            <CardHeader data={data} />
            <CardContent 
                data={data} 
                onExecAction={handleOpenTerminal} 
                preparadasCount={preparadas}
                servidasCount={servidas}
            />
            <CardExtraInfo data={data} />
            <CardFooter data={data} />
            <ModalTerminal 
                isOpen={isTerminalOpen} 
                onClose={() => setIsTerminalOpen(false)} 
                type={actionType} 
                memberName={data.name}
            />
            <ProjectCarousel data={data} />
        </div>
    </div>
  )
}


export default Profile