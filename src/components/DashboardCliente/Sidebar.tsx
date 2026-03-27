import React from 'react';
import { LayoutDashboard, Calendar, Star, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const SidebarCliente: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  
  const navigate = useNavigate();

  // ✅ MOVER AQUÍ
  const username = localStorage.getItem('username') || 'Admin';
  const initial = username.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { id: 'Inicio', label: 'Inicio', icon: <LayoutDashboard size={20} /> },
    { id: 'MisCitas', label: 'Mis Citas', icon: <Calendar size={20} /> },
    { id: 'Favoritos', label: 'Favoritos', icon: <Star size={20} /> },
    { id: 'Perfil', label: 'Perfil', icon: <User size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-white/5 flex flex-col shrink-0">
      
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black italic">B</div>
        <h1 className="text-xl font-black tracking-tighter">
          BARBER<span className="text-primary text-2xl">.</span>TECH
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeView === item.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* USER PROFILE */}
      <div className="p-6 mt-auto">
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-[24px] p-4 mb-4 transition-all hover:border-primary/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-black text-sm uppercase">
                {initial}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-slate-800 dark:text-white leading-tight">{username}</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Cliente</p>
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="p-4 mt-auto">
          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all duration-300 font-bold text-sm border border-transparent hover:border-red-200 dark:hover:border-red-900/30 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarCliente;