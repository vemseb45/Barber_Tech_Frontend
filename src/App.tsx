import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Registro";
import DashboardBarbero from "./pages/barbero/DashboardBarbero";
import DashboardAdmin from "./pages/administrador/DashboardAdmin";
import DashboardCliente from "./pages/cliente/DashboardCliente";
import ForgotPassword from "./pages/auth/cambiarContrasena";
import ResetPassword from "./pages/auth/olvidarContrasena";

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
      <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      <Route path="/dashboardCliente" element={<DashboardCliente />} />

      {/* 🔐 RECUPERACIÓN */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;