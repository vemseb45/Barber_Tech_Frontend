import React, { useState } from 'react';
import { 
  Home, 
  CalendarDays, 
  Scissors, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronDown,
  CalendarCheck,
  History
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { BarberoView } from '../../types';

interface SidebarProps {
  activeView: BarberoView;
  onViewChange: (view: BarberoView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();
  
  // Estado para el acordeón de Citas
  const [isCitasOpen, setIsCitasOpen] = useState(
    activeView === 'Citas' || activeView === ('Agenda' as any) || activeView === ('Historial' as any)
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Verificamos si alguna sub-opción de citas está activa para resaltar el botón padre
  const isCitasActive = activeView === 'Citas' || activeView === ('Agenda' as any) || activeView === ('Historial' as any);

  const username = localStorage.getItem('username') || 'Barbero';
  const initial = username.charAt(0).toUpperCase();

  return (
    <aside className="w-72 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300 z-50">
      
      {/* BRAND / LOGO */}
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-[16px] flex items-center justify-center text-white shadow-xl shadow-primary/30 shrink-0 transform -rotate-3 transition-transform duration-300">
          <Scissors size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tight dark:text-white leading-none">BarberTech</span>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Professional</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Menú Principal</p>
        
        {/* INICIO */}
        <button
          onClick={() => onViewChange('Inicio')}
          className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
            activeView === 'Inicio' 
              ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1 font-bold' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary font-bold'
          }`}
        >
          <Home size={20} strokeWidth={activeView === 'Inicio' ? 2.5 : 2} />
          <span className="text-sm">Inicio</span>
        </button>

        {/* ACORDEÓN CITAS */}
        <div className="space-y-1">
          <button
            onClick={() => setIsCitasOpen(!isCitasOpen)}
            className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
              isCitasActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-4 font-bold text-sm">
              <CalendarDays size={20} strokeWidth={isCitasActive ? 2.5 : 2} />
              <span>Citas</span>
            </div>
            {isCitasOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {/* SUBMENÚ */}
          {isCitasOpen && (
            <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => onViewChange('Agenda' as any)}
                className={`w-full flex items-center gap-4 px-9 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeView === ('Agenda' as any) 
                    ? 'text-primary bg-primary/5 shadow-sm' 
                    : 'text-slate-400 hover:text-primary dark:hover:text-slate-200'
                }`}
              >
                <CalendarCheck size={18} />
                <span>Agenda</span>
              </button>
              <button
                onClick={() => onViewChange('Pendientes' as any)}
                className={`w-full flex items-center gap-4 px-9 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeView === ('Pendientes' as any) 
                    ? 'text-primary bg-primary/5 shadow-sm' 
                    : 'text-slate-400 hover:text-primary dark:hover:text-slate-200'
                }`}
              >
                <CalendarDays size={18} />
                <span>Servicios Pendientes</span>
              </button>
              <button
                onClick={() => onViewChange('Historial' as any)}
                className={`w-full flex items-center gap-4 px-9 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeView === ('Historial' as any) 
                    ? 'text-primary bg-primary/5 shadow-sm' 
                    : 'text-slate-400 hover:text-primary dark:hover:text-slate-200'
              }`}
              >
                <History size={18} />
                <span>Servicios Realizados</span>
              </button>
            </div>
          )}
        </div>

        {/* SERVICIOS */}
        <button
          onClick={() => onViewChange('Servicios')}
          className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
            activeView === 'Servicios' 
              ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1 font-bold' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary font-bold'
          }`}
        >
          <Scissors size={20} strokeWidth={activeView === 'Servicios' ? 2.5 : 2} />
          <span className="text-sm">Servicios</span>
        </button>

        {/* AJUSTES */}
        <button
          onClick={() => onViewChange('Ajustes')}
          className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
            activeView === 'Ajustes' 
              ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1 font-bold' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary font-bold'
          }`}
        >
          <Settings size={20} strokeWidth={activeView === 'Ajustes' ? 2.5 : 2} />
          <span className="text-sm">Ajustes</span>
        </button>
      </nav>

      {/* USER PROFILE & FOOTER */}
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
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Master Barber</p>
            </div>
          </div>
        </div>

        <button 
          className="w-full flex items-center justify-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all duration-300 font-bold text-sm border border-transparent hover:border-red-200 dark:hover:border-red-900/30 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;