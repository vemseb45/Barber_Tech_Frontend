import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CalendarPlus, History, Star, Settings, LogOut, ChevronRight, Sparkles } from 'lucide-react';

type ClienteView = 'Inicio' | 'Reservas' | 'Historial' | 'Favoritos' | 'Ajustes';

interface SidebarProps {
  activeView: ClienteView;
  onViewChange: (view: ClienteView) => void;
}

const SidebarCliente: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();
  
  const menuItems: { name: ClienteView; icon: React.FC<any>; label: string }[] = [
    { name: 'Inicio', icon: Home, label: 'Mi Panel' },
    { name: 'Reservas', icon: CalendarPlus, label: 'Nueva Cita' },
    { name: 'Historial', icon: History, label: 'Mis Citas' },
    { name: 'Ajustes', icon: Settings, label: 'Perfil' },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300 z-50">
      
      {/* BRAND / LOGO */}
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-[16px] flex items-center justify-center text-white shadow-xl shadow-primary/30 shrink-0 transform -rotate-3 group hover:rotate-0 transition-transform duration-300">
          <Sparkles size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tight dark:text-white leading-none">BarberTech</span>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Client Pro</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Menú Usuario</p>
        
        {menuItems.map((item) => {
          const isActive = activeView === item.name;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => onViewChange(item.name)}
              className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-4 font-bold text-sm">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} className="opacity-70" />}
            </button>
          );
        })}
      </nav>

      {/* USER PROFILE */}
      <div className="p-6 mt-auto">
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-[24px] p-4 mb-4 transition-all hover:border-primary/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://ui-avatars.com/api/?name=Juan+Perez&background=7924c7&color=fff" 
                className="w-11 h-11 rounded-full border-2 border-primary shadow-sm"
                alt="User"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-slate-800 dark:text-white leading-tight">Juan Pérez</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Cliente Platinum</p>
            </div>
          </div>
        </div>

        <button 
          className="w-full flex items-center justify-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all duration-300 font-bold text-sm border border-transparent hover:border-red-200 dark:hover:border-red-900/30 cursor-pointer"
          onClick={() => navigate('/login')}
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarCliente;