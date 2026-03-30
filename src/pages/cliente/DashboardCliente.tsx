import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTACIÓN DEL LAYOUT Y COMPONENTES
import ClienteLayout from '../../layouts/ClienteLayout';
import ViewAgenda from "../../components/DashboardCliente/Viewagenda";
import ViewAjustesCliente from "../../components/DashboardCliente/Viewajustes";
import ViewPendientes from "../../components/DashboardCliente/Viewpendientes";
import ViewInicioCliente from "../../components/DashboardCliente/Viewinicio"; 
import ViewTerminadas from "../../components/DashboardCliente/Viewterminadas";

export default function DashboardCliente() {
  const [activeView, setActiveView] = useState('Inicio');

  return (
    <ClienteLayout 
      activeView={activeView} 
      onViewChange={(view) => setActiveView(view)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >

          {/* INICIO */}
          {activeView === 'Inicio' && (
            <ViewInicioCliente onViewChange={setActiveView} />
          )}

          {/* MIS CITAS (compatibilidad) */}
          {activeView === 'MisCitas' && (
            <ViewAgenda /> 
          )}

          {/* RESERVAR */}
          {activeView === 'Reservar Cita' && (
            <ViewAgenda />
          )}

          {/* PENDIENTES */}
          {activeView === 'Citas Pendientes' && (
            <ViewPendientes />
          )}

          {/* TERMINADAS */}
          {activeView === 'Citas Terminadas' && (
            <ViewTerminadas />
          )}

          {/* PERFIL */}
          {activeView === 'Perfil' && (
            <ViewAjustesCliente />
          )}

        </motion.div>
      </AnimatePresence>
    </ClienteLayout>
  );
}