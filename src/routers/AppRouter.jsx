import { Routes, Route } from "react-router-dom";
import Layout from "@components/layout";
import Home from "../pages/home/Home";
import FichaDani from "../pages/fichas/FichaDani";
import FichaLean from "../pages/fichas/FichaLean";
import FichaNaty from "../pages/fichas/FichaNaty";
import FichaLuma from "../pages/fichas/FichaLuma";
import Bitacora from "../pages/bitacora/Bitacora";
import ProductionTickets from "../pages/ProductionTickets/ProductionTickets";

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ficha-dani" element={<FichaDani />} />
        <Route path="/ficha-lean" element={<FichaLean />} />
        <Route path="/ficha-naty" element={<FichaNaty />} />
        <Route path="/ficha-luma" element={<FichaLuma />} />
        <Route path="/bitacora" element={<Bitacora />} />
        <Route path="/tickets" element={<ProductionTickets />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;
