import React, { useState, useEffect } from 'react';
import { Bell, Moon, Sun, Search } from 'lucide-react'; // ✅ agregado Search
import SidebarCliente from '../components/DashboardCliente/Sidebar';

interface ClienteLayoutProps {
  children: React.ReactNode;
  activeView: any;
  onViewChange: (view: any) => void;
}

const ClienteLayout: React.FC<ClienteLayoutProps> = ({ children, activeView, onViewChange }) => {

  // ✅ estado correcto
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // ✅ función corregida
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // ✅ sincronización inicial
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      
      {/* SIDEBAR */}
      <SidebarCliente activeView={activeView} onViewChange={onViewChange} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 bg-white dark:bg-white/5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-8">
          
          <h1 className="text-2xl font-black uppercase italic">
            {activeView === 'Inicio' ? 'Panel Cliente' : activeView} {/* ✅ cambiado */}
          </h1>

          <div className="flex items-center gap-4">

            {/* BUSCADOR */}
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 rounded-2xl text-sm border outline-none w-64"
              />
            </div>

            {/* DARK MODE */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 hover:scale-110 transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* NOTIFICACIONES */}
            <button className="relative p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

          </div>
        </header>

        {/* CONTENIDO */}
        <section className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>

      </main>
    </div>
  );
};

export default ClienteLayout;