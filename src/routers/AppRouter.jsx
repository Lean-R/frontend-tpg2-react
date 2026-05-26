import {Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import FichaDani from "../pages/fichas/FichaDani";
import FichaLean from "../pages/fichas/FichaLean";
import FichaNaty from "../pages/fichas/FichaNaty";
import FichaLuma from "../pages/fichas/FichaLuma";
import Bitacora from "../pages/bitacora/Bitacora";





const AppRouter = () => {
  return (
    <>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/ficha-dani" element={<FichaDani/>}/>
            <Route path="/ficha-lean" element={<FichaLean/>}/>
            <Route path="/ficha-naty" element={<FichaNaty/>}/>
            <Route path="/ficha-luma" element={<FichaLuma/>}/>
            <Route path="/bitacora" element={<Bitacora/>}/>
        </Routes>
    </>
  )
}

export default AppRouter