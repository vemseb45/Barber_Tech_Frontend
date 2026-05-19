import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Registro";
import DashboardBarbero from "./pages/barbero/DashboardBarbero";
import DashboardAdmin from "./pages/administrador/DashboardAdmin";
import DashboardCliente from "./pages/cliente/DashboardCliente";

// Importaciones unificadas
import ForgotPassword from "./pages/auth/olvidarContrasena";
import ResetPassword from "./pages/auth/cambiarContrasena";
import NotFound from "./pages/Errores/Error_Notfund";

function App() {
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    }
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboardBarbero" element={<DashboardBarbero />} />
      <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      <Route path="/dashboardCliente" element={<DashboardCliente />} />

      {/* RECUPERACIÓN */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* RUTA COMODÍN (Cualquier ruta que no coincida con las de arriba caerá aquí) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;