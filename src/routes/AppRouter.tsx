import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Registro";
import DashboardAdmin from "../pages/administrador/DashboardAdmin";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        
        {/* ruta panel de administrador */}
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}