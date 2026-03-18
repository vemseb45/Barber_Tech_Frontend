import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Scissors, 
  Store, 
  BarChart3, 
  LogOut, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import type { AdminView } from '../../types';

interface SidebarProps {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'Inicio' as AdminView, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'Usuarios' as AdminView, icon: Users, label: 'Equipo' },
    { id: 'Servicios' as AdminView, icon: Scissors, label: 'Catálogo' },
    { id: 'Barberías' as AdminView, icon: Store, label: 'Sucursales' },
    { id: 'Reportes' as AdminView, icon: BarChart3, label: 'Analíticas' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <aside className="w-72 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300 z-50">
      
      {/* ADMIN BRANDING */}
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-tr from-[#7924c7] to-[#9d50bb] rounded-[18px] flex items-center justify-center text-white shadow-xl shadow-purple-500/20 shrink-0 transform hover:scale-105 transition-transform duration-300">
          <ShieldCheck size={26} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tight dark:text-white leading-none">BarberAdmin</span>
          <span className="text-[10px] font-bold text-[#7924c7] uppercase tracking-[0.2em] mt-1">Control Panel</span>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
        <p className="px-5 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.25em] mb-4">Gestión Global</p>
        
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full group flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-[#7924c7] text-white shadow-lg shadow-purple-500/30 translate-x-1' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-[#7924c7] dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-4 font-bold text-sm">
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "animate-pulse" : "group-hover:rotate-12 transition-transform"} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} className="opacity-60" />}
            </button>
          );
        })}
      </nav>

      {/* FOOTER / ADMIN PROFILE */}
      <div className="p-6 mt-auto">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-[28px] p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-[#7924c7] flex items-center justify-center text-white font-black text-sm border-2 border-white dark:border-slate-800 shadow-md">
                CA
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black truncate text-slate-800 dark:text-white leading-tight">Carlos Admin</p>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-tighter">Super Administrador</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-widest border border-transparent hover:border-red-100 dark:hover:border-red-900/20 cursor-pointer"
        >
          <LogOut size={16} strokeWidth={3} />
          <span>Finalizar Sesión</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;