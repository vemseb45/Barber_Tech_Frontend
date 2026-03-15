import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardBarbero from "./pages/DashboardBarbero";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardCliente from "./pages/DashboardCliente";

function App() {
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