import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Scissors, Store, BarChart3, LogOut } from 'lucide-react';
import type { AdminView } from '../../types';

interface SidebarProps {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'Inicio' as AdminView, icon: LayoutDashboard, label: 'Inicio' },
    { id: 'Usuarios' as AdminView, icon: Users, label: 'Usuarios' },
    { id: 'Servicios' as AdminView, icon: Scissors, label: 'Servicios' },
    { id: 'Barberías' as AdminView, icon: Store, label: 'Barberías' },
    { id: 'Reportes' as AdminView, icon: BarChart3, label: 'Reportes' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <aside className="w-64 bg-white dark:bg-[#1e1b33] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#7924c7] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#7924c7]/20">
          B
        </div>
        <span className="font-bold text-xl tracking-tight dark:text-white">BarberAdmin</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeView === item.id
                ? 'bg-[#7924c7] text-white shadow-lg shadow-[#7924c7]/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-4">
          <div className="w-10 h-10 rounded-full bg-[#7924c7] flex items-center justify-center text-white font-bold border-2 border-[#7924c7]">
            CA
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate dark:text-white">Carlos Admin</p>
            <p className="text-xs text-slate-500 truncate">Super Administrador</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;