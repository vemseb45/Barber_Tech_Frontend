import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ViewInicio from '../../components/DashboardAdmin/ViewInicio';
import ViewClientes from '../../components/DashboardAdmin/ViewUsuarios'; // 👈 Nuevo
import ViewBarberos from '../../components/DashboardAdmin/ViewBarberos'; // 👈 Nuevo
import ViewServicios from '../../components/DashboardAdmin/ViewServicios';
import { motion, AnimatePresence } from 'framer-motion'; 
import type { AdminView } from '../../types';

const DashboardAdmin: React.FC = () => {
  const [activeView, setActiveView] = useState<AdminView>('Inicio');

  // Forzamos el modo oscuro al entrar al panel de administración
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {(() => {
            switch (activeView) {
              case 'Inicio': 
                return <ViewInicio />;
              
              case 'Clientes': // 👈 Caso para la sub-vista de Clientes
                return <ViewClientes />;
              
              case 'Barberos': // 👈 Caso para la sub-vista de Barberos
                return <ViewBarberos />;
              
              case 'Servicios': 
                return <ViewServicios />;
              
              case 'Barberías':
                return <PlaceholderView icon="🏪" title="Módulo de Barberías" />;
              
              case 'Reportes':
                return <PlaceholderView icon="📊" title="Módulo de Reportes" />;
              
              default:
                return <ViewInicio />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <AdminLayout activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
    </AdminLayout>
  );
};

// Componente para módulos en construcción
const PlaceholderView: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4">
    <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-xl">
      <span className="text-5xl">{icon}</span>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="text-sm font-medium opacity-60 italic">Estamos trabajando en nuevas funciones...</p>
    </div>
  </div>
);

export default DashboardAdmin;