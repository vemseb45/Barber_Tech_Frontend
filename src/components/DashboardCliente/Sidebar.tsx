import React from 'react';
import { LayoutDashboard, Calendar, Star, User, LogOut } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const SidebarCliente: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  
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
        <h1 className="text-xl font-black tracking-tighter">BARBER<span className="text-primary text-2xl">.</span>TECH</h1>
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

      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-4 px-4 py-4 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all cursor-pointer">
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default SidebarCliente;