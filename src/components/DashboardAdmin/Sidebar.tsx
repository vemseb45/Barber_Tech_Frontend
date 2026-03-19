import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Scissors, Store, BarChart3, 
  LogOut, ShieldCheck, ChevronRight, ChevronDown, 
  UserRound, UserCog 
} from 'lucide-react';
import type { AdminView } from '../../types';

interface SidebarProps {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();
  const [isUsersOpen, setIsUsersOpen] = useState(activeView === 'Clientes' || activeView === 'Barberos');
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const isUserViewActive = activeView === 'Clientes' || activeView === 'Barberos';

  return (
    <aside className="w-72 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 z-50">
      
      {/* BRANDING */}
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-tr from-[#7924c7] to-[#9d50bb] rounded-[18px] flex items-center justify-center text-white shadow-lg">
          <ShieldCheck size={26} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl dark:text-white">BarberAdmin</span>
          <span className="text-[10px] font-bold text-[#7924c7] uppercase tracking-widest">Control Panel</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
        <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Gestión Global</p>
        
        {/* DASHBOARD */}
        <button
          onClick={() => onViewChange('Inicio')}
          className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${
            activeView === 'Inicio' ? 'bg-[#7924c7] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="font-bold text-sm">Dashboard</span>
        </button>

        {/* DROPDOWN USUARIOS */}
        <div className="space-y-1">
          <button
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all ${
              isUserViewActive ? 'text-[#7924c7] bg-purple-50 dark:bg-purple-900/10' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-4 font-bold text-sm">
              <Users size={20} />
              <span>Usuarios</span>
            </div>
            {isUsersOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {isUsersOpen && (
            <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => onViewChange('Clientes')}
                className={`w-full flex items-center gap-4 px-9 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeView === 'Clientes' ? 'text-[#7924c7] bg-purple-100/50' : 'text-slate-400 hover:text-[#7924c7]'
                }`}
              >
                <UserRound size={16} /> <span>Clientes</span>
              </button>
              <button
                onClick={() => onViewChange('Barberos')}
                className={`w-full flex items-center gap-4 px-9 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeView === 'Barberos' ? 'text-[#7924c7] bg-purple-100/50' : 'text-slate-400 hover:text-[#7924c7]'
                }`}
              >
                <UserCog size={16} /> <span>Barberos</span>
              </button>
            </div>
          )}
        </div>

        {/* OTROS ITEMS */}
        {[
          { id: 'Servicios', icon: Scissors, label: 'Catálogo' },
          { id: 'Barberías', icon: Store, label: 'Sucursales' },
          { id: 'Reportes', icon: BarChart3, label: 'Analíticas' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as AdminView)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${
              activeView === item.id ? 'bg-[#7924c7] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <item.icon size={20} />
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-6 mt-auto">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black text-xs uppercase tracking-widest border border-transparent hover:border-red-100">
          <LogOut size={16} strokeWidth={3} />
          <span>Finalizar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;