/* --- src/pages/barbero/DashboardBarbero.tsx --- */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORTACIONES
import BarberoLayout from '../../layouts/BarberoLayout';
import ViewInicio from '../../components/DashboardBarbero/ViewInicio';
import ViewCitas from '../../components/DashboardBarbero/ViewCitas';
import ViewAjustes from '../../components/DashboardBarbero/ViewAjustes';
import ViewHistorial from '../../components/DashboardBarbero/ViewHistorial';
import type { BarberoView } from '../../types';

const DashboardBarbero: React.FC = () => {
  const [activeView, setActiveView] = useState<BarberoView>('Inicio');

  // Forzamos el modo oscuro para el panel de trabajo
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="h-full"
        >
          {(() => {
            switch (activeView) {
              case 'Inicio': 
                return <ViewInicio onViewChange={setActiveView} />;
              case 'Citas': 
              case 'Agenda':
                return <ViewCitas />;
              case 'Historial':
                return <ViewHistorial />;
              case 'Ajustes': 
                return <ViewAjustes />;
              case 'Clientes':
                return <PlaceholderView icon="👥" title="Módulo de Clientes" />;
              default:
                return <ViewInicio onViewChange={setActiveView} />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <BarberoLayout activeView={activeView} onViewChange={setActiveView}>
      <div className="p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 transition-colors duration-500">
        {renderContent()}
      </div>
    </BarberoLayout>
  );
};

// Componente de soporte para vistas no listas
const PlaceholderView: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <div className="flex flex-col items-center justify-center h-[70vh] text-center">
    <div className="w-24 h-24 bg-primary/10 dark:bg-white/5 rounded-[32px] flex items-center justify-center border border-primary/20 dark:border-white/10 shadow-2xl mb-6">
      <span className="text-5xl">{icon}</span>
    </div>
    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto italic">
      Estamos preparando esta sección para mejorar tu flujo de trabajo.
    </p>
  </div>
);

export default DashboardBarbero;