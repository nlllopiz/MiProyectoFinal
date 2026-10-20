import { Routes, Route } from "react-router-dom";

import "./App.css";

import Layout from "./componentes/Layout/Layout";

import Inicio from "./paginas/Inicio/Inicio";
import Vinos from "./paginas/Vinos/Vinos";
import ProductoDetalle from "./paginas/ProductoDetalle/ProductoDetalle";
import Nosotros from "./paginas/Nosotros/Nosotros";
import Contacto from "./paginas/Contacto/Contacto";
import NoEncontrada from "./paginas/NoEncontrada/NoEncontrada";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="vinos" element={<Vinos />} />
        <Route path="vinos/:id" element={<ProductoDetalle />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
