import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarPlus, Clock, MapPin, Gift } from "lucide-react";

// IMPORTACIÓN DEL LAYOUT Y COMPONENTES
import ClienteLayout from '../../layouts/ClienteLayout';
import ViewAgenda from "../../components/DashboardCliente/Viewagenda";
import ViewAjustesCliente from "../../components/DashboardCliente/Viewajustes";

// --- SUB-COMPONENTE: INICIO ---
const ViewInicio = ({ onReservaClick }: { onReservaClick: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }}
    className="space-y-8"
  >
    {/* BANNER DINÁMICO */}
    <div className="relative overflow-hidden bg-primary rounded-[40px] p-10 text-white shadow-2xl shadow-primary/20">
      <div className="relative z-10 max-w-lg">
        <h2 className="text-4xl font-black leading-tight">¿Listo para tu próximo gran cambio?</h2>
        <p className="mt-4 text-white/80 font-medium">Reserva hoy y mantén tu estilo impecable con nuestros barberos expertos.</p>
        <button 
          onClick={onReservaClick}
          className="mt-8 bg-white text-primary px-8 py-4 rounded-[20px] font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
        >
          Reservar Ahora <CalendarPlus size={18} />
        </button>
      </div>
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* PRÓXIMA CITA */}
      <div className="lg:col-span-2 p-8 bg-white dark:bg-white/5 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-sm">
        <h4 className="font-black text-xl mb-6 text-slate-800 dark:text-white">Tu Próxima Cita</h4>
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-white/5 rounded-[28px] border border-dashed border-slate-200 dark:border-white/10">
          <div className="flex flex-col items-center justify-center px-6 border-r border-slate-200 dark:border-white/10">
            <span className="text-4xl font-black text-primary">18</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Marzo</span>
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-200">
              <Clock size={18} className="text-primary" /> 15:30 PM
            </div>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
              <MapPin size={18} className="text-primary" /> Barbería Central - Silla 02
            </div>
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-black">
              Corte Premium + Barba
            </div>
          </div>
        </div>
      </div>

      {/* LEALTAD - COLOR ACTUALIZADO A MORADO CLARITO */}
      <div className="p-8 bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-[32px] border border-purple-200/50 dark:border-purple-700/30 text-slate-800 dark:text-white flex flex-col items-center justify-center text-center shadow-xl shadow-purple-500/5">
        <Gift size={40} className="mb-4 text-purple-600 dark:text-purple-400" />
        <h4 className="text-4xl font-black text-slate-900 dark:text-white">450</h4>
        <p className="font-bold text-xs uppercase tracking-widest mt-2 text-slate-500 dark:text-slate-300 opacity-90">Puntos Barber</p>
        
        {/* Barra de progreso en el mismo tono */}
        <div className="mt-6 w-full bg-white/50 dark:bg-slate-800/50 h-2.5 rounded-full overflow-hidden border border-purple-100 dark:border-slate-700">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-1000" 
            style={{ width: '75%' }}
          ></div>
        </div>
        
        <p className="text-[10px] mt-4 font-black text-purple-600 dark:text-purple-300 uppercase tracking-tighter bg-purple-50 dark:bg-purple-900/40 px-3 py-1 rounded-full">
          ¡Faltan 50 puntos para un corte gratis!
        </p>
      </div>
    </div>
  </motion.div>
);

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
          {activeView === 'Inicio' && (
            <ViewInicio onReservaClick={() => setActiveView('MisCitas')} />
          )}
          
          {activeView === 'MisCitas' && (
            <ViewAgenda /> 
          )}

          {activeView === 'Favoritos' && (
            <div className="p-12 text-center bg-white dark:bg-white/5 rounded-[32px] border border-dashed border-slate-200 dark:border-white/10">
              <h3 className="text-xl font-bold">Tus Barberos Favoritos</h3>
              <p className="text-slate-500 mt-2">Aquí aparecerán los barberos que marques con estrella.</p>
            </div>
          )}

          {activeView === 'Perfil' && (
            <ViewAjustesCliente />
          )}
        </motion.div>
      </AnimatePresence>
    </ClienteLayout>
  );
}