import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DashboardCliente() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Inicio", icon: "🏠", path: "/dashboardCliente" },
    { name: "Reservas", icon: "📅", path: "/agendaCliente" },
    { name: "Perfil", icon: "👤", path: "/cliente/perfil" },
  ];

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="dashboard-container">
      
      {/* SIDEBAR */}
      <aside className="sidebar-aside">
        <div className="flex items-center gap-[14px] mb-12">
          <div className="logo-box">B</div>
          <h2 className="text-xl font-bold tracking-tight">BarberTech</h2>
        </div>
        
        <nav className="flex flex-col gap-3 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link-custom ${location.pathname === item.path ? 'nav-link-active' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-[var(--color-primary)] flex items-center justify-center font-bold">JP</div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Juan Pérez</span>
              <span className="text-xs text-slate-500">Cliente Platinum</span>
            </div>
          </div>
          <button 
            onClick={() => navigate("/login")}
            className="text-red-400 text-sm font-semibold flex items-center hover:text-red-300 transition-colors"
          >
            <span className="mr-2">↪️</span> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col gap-8">
        <header className="mt-2">
          <h1 className="text-4xl font-extrabold mb-2">Panel de Control</h1>
          <p className="text-slate-400">Gestiona tus citas y preferencias de estilo.</p>
        </header>

        <div className="animate-fade-in flex flex-col gap-5 max-w-[720px]">
          
          {/* CARD: AGENDAR */}
          <Link to="/agendaCliente" className="action-card-modern">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Agendar Cita</h3>
              <span className="text-2xl text-primary-custom">📅</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Selecciona tu barbero de preferencia y reserva un espacio en el calendario.
            </p>
            <div className="text-right font-bold text-sm text-primary-custom">
              Explorar disponibilidad →
            </div>
          </Link>

          {/* CARD: PERFIL */}
          <Link to="/cliente/perfil" className="action-card-modern">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Mi Perfil</h3>
              <span className="text-2xl text-primary-custom">👤</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Actualiza tu información personal y preferencias de seguridad.
            </p>
            <div className="text-right font-bold text-sm text-primary-custom">
              Editar información →
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}