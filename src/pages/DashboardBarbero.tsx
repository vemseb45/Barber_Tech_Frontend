import React, { useState } from 'react';
import BarberoLayout from '../layouts/BarberoLayout';
import ViewInicio from '../components/DashboardBarbero/ViewInicio';
import ViewCitas from '../components/DashboardBarbero/ViewCitas';
import ViewAjustes from '../components/DashboardBarbero/ViewAjustes';
import ViewServicios from '../components/DashboardBarbero/ViewServicios';
import type { BarberoView } from '../types';

const DashboardBarbero: React.FC = () => {
  const [activeView, setActiveView] = useState<BarberoView>('Inicio');

  const renderContent = () => {
    switch (activeView) {
      case 'Inicio':
        return <ViewInicio onViewChange={setActiveView} />;
      case 'Citas':
        return <ViewCitas />;
      case 'Clientes':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 animate-pulse">
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-4xl">👥</span>
            </div>
            <p className="text-lg font-medium">Módulo de Clientes en construcción...</p>
          </div>
        );
      case 'Servicios':
        return <ViewServicios />;
      case 'Ajustes':
        return <ViewAjustes />;
      default:
        return <ViewInicio onViewChange={setActiveView} />;
    }
  };

  return (
    <BarberoLayout activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
    </BarberoLayout>
  );
};

export default DashboardBarbero;