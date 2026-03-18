import React from 'react';
import { Home, CalendarDays, Users, Scissors, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { BarberoView } from '../../types';

interface SidebarProps {
  activeView: BarberoView;
  onViewChange: (view: BarberoView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();

  const menuItems: { name: BarberoView; icon: React.FC<any> }[] = [
    { name: 'Inicio', icon: Home },
    { name: 'Citas', icon: CalendarDays },
    { name: 'Clientes', icon: Users },
    { name: 'Servicios', icon: Scissors },
    { name: 'Ajustes', icon: Settings },
  ];

  const handleLogout = () => {
    // Si requieres limpiar el localStorage hazlo aquí
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-card-dark border-r border-slate-200 dark:border-border-dark flex flex-col h-screen sticky top-0 transition-all duration-300">
      
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 shrink-0">
          <Scissors size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight dark:text-white">BarberTech</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeView === item.name;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => onViewChange(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200 dark:border-border-dark">
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-primary shrink-0">
            CB
          </div>
          <div className="overflow-hidden text-left">
            <p className="text-sm font-semibold truncate dark:text-white">Carlos Barbero</p>
            <p className="text-xs text-slate-500 truncate">Barbero</p>
          </div>
        </div>

        <button 
          className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
