import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Registro";
import DashboardBarbero from "./pages/barbero/DashboardBarbero";
import DashboardAdmin from "./pages/administrador/DashboardAdmin";
import DashboardCliente from "./pages/cliente/DashboardCliente";

// --- AQUÍ ESTÁ LA CORRECCIÓN ---
import ForgotPassword from "./pages/auth/olvidarContrasena";
import ResetPassword from "./pages/auth/cambiarContrasena"; 
// -------------------------------

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
    </Routes>
  );
}

export default App;