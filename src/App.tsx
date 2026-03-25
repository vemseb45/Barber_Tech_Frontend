import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Registro";
import DashboardBarbero from "./pages/barbero/DashboardBarbero";
import DashboardAdmin from "./pages/administrador/DashboardAdmin";
import DashboardCliente from "./pages/cliente/DashboardCliente";

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboardBarbero" element={<DashboardBarbero />} />
      <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
      <Route path="/DashboardCliente" element={<DashboardCliente />} />
    </Routes>
  );
}

export default App;