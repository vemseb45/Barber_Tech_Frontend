import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ViewInicio from '../../components/DashboardAdmin/ViewInicio';
import ViewUsuarios from '../../components/DashboardAdmin/ViewUsuarios';
import ViewServicios from '../../components/DashboardAdmin/ViewServicios';
import type { AdminView } from '../../types';

const DashboardAdmin: React.FC = () => {
  const [activeView, setActiveView] = useState<AdminView>('Inicio');

  const renderContent = () => {
    switch (activeView) {
      case 'Inicio':
        return <ViewInicio />;
      case 'Usuarios':
        return <ViewUsuarios />;
      case 'Servicios':
        return <ViewServicios />;
      case 'Barberías':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 animate-pulse">
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-4xl">🏪</span>
            </div>
            <p className="text-lg font-medium">Módulo de Barberías en construcción...</p>
          </div>
        );
      case 'Reportes':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 animate-pulse">
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <p className="text-lg font-medium">Módulo de Reportes en construcción...</p>
          </div>
        );
      default:
        return <ViewInicio />;
    }
  };

  return (
    <AdminLayout activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
    </AdminLayout>
  );
};

export default DashboardAdmin;