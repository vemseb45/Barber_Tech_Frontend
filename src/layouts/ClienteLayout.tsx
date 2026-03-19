import React, { useState, useEffect } from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import SidebarCliente from '../components/DashboardCliente/Sidebar'; // Asegúrate de que la ruta sea correcta

interface ClienteLayoutProps {
  children: React.ReactNode;
  activeView: any;
  onViewChange: (view: any) => void;
}

const ClienteLayout: React.FC<ClienteLayoutProps> = ({ children, activeView, onViewChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      
      {/* TU SIDEBAR REAL */}
      <SidebarCliente activeView={activeView} onViewChange={onViewChange} />

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 px-8 flex items-center justify-between bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-md border-b border-slate-200 dark:border-white/5 shrink-0">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Panel de Control</h2>
            <p className="text-xl font-black text-slate-800 dark:text-white mt-1">Hola, Juan Pérez 👋</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-yellow-400 hover:scale-105 transition-all shadow-sm cursor-pointer"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <button className="relative p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 shadow-sm cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full ring-2 ring-white dark:ring-[#1e293b]"></span>
            </button>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO CON SCROLL */}
        <section className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClienteLayout;