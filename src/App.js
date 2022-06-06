import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PersonajeDetalle from "./components/PersonajeDetalle";
import Detalle from "./pages/Detalle";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Detalle/:id" element={<Detalle />} />
        {/* <Route path="/products/:id" element={<PersonajeDetalle />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
