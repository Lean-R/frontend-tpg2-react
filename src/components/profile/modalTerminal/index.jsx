import style from './ModalTerminal.module.css'
import { useState, useEffect } from 'react';

const ModalTerminal = ({ isOpen , onClose, type, memberName}) => {
  const [logs, setLogs] = useState([]);

  const scriptLines = type === 'preparar' 
    ? [
        { text: `[${memberName.toUpperCase()}] : cargando perfil ${memberName.toUpperCase()}...`, delay: 1000 },
        { text: `[${memberName.toUpperCase()}] : calentando servidor...`, delay: 1600 },
        { text: `[${memberName.toUpperCase()}] : mezclando frontend y backend...`, delay: 1800 },
        { text: `[${memberName.toUpperCase()}] : blend full-stack: OK`, delay: 1000 },
        { text: `[${memberName.toUpperCase()}] : taza completa servida`, delay: 1400 }
      ]
    : [
        { text: `[${memberName.toUpperCase()}] : blend fullstack servido...`, delay: 1000 },
        { text: `[${memberName.toUpperCase()}] : frontend fresco: OK`, delay: 1000 },
        { text: `[${memberName.toUpperCase()}] : backend intenso: OK`, delay: 1000 },
        { text: `[${memberName.toUpperCase()}] : conexion estable: OK`, delay: 1000 },
        { text: `[${memberName.toUpperCase()}] : experiencia_completa_en_una_taza`, delay: 1600 }
      ];  


useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;

    const printlogsSequentially = async () => {
      for (const line of scriptLines) {
        if (!isMounted) break;
        await new Promise(resolve => setTimeout(resolve, line.delay));
        setLogs(prevLogs => [...prevLogs, line.text]);
      }
    };
    printlogsSequentially();
    return () => {
      isMounted = false;
      setLogs([]);
    };  
}, [isOpen, type]);
 
    if (!isOpen) return;


  return (

        <div id="terminal-modal" className={style.terminal_overlay}>
            <div className={style.terminal_window}>
                <div className={style.terminal_header}>
                    <span>{memberName}_blend_engine.sh</span>
                    <button id="close-terminal" onClick={onClose} className={style.close_btn}>X</button>
                </div>
                <div id="terminal-body" className={style.terminal_body}>
                    {logs.map((log, index) => (<p key={index}>{`> ${log}`}</p>))}
                </div>
            </div>
        </div>
  )
}

export default ModalTerminal
