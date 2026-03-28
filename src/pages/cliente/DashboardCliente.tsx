import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarPlus, Clock, MapPin, Gift, Scissors, Star } from "lucide-react";

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
    {/* ENCABEZADO TIPO DASHBOARD */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
          ¡Hola, {localStorage.getItem('username') || 'Cliente'}!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Aquí tienes un resumen de tu actividad y próximas citas.
        </p>
      </div>
    </div>

    {/* BANNER DINÁMICO */}
    <div className="relative overflow-hidden bg-[#9c51e0] rounded-[40px] p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
      
      {/* TEXTO IZQUIERDO */}
      <div className="relative z-10 max-w-lg w-full">
        <h2 className="text-3xl md:text-[2.75rem] font-black leading-[1.1] tracking-tight">
          ¿Listo para tu próximo gran cambio?
        </h2>
        <p className="mt-4 text-white/90 font-medium md:text-lg">
          Reserva hoy y mantén tu estilo impecable con nuestros barberos expertos.
        </p>
        <button 
          onClick={onReservaClick}
          className="mt-8 bg-white text-[#9c51e0] px-8 py-4 rounded-[20px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer w-full md:w-auto shadow-xl"
        >
          Reservar Ahora <CalendarPlus size={18} />
        </button>
      </div>

      {/* ARTE DERECHO - MINIMALISTA Y ELEGANTE */}
      <div className="relative z-10 hidden lg:flex items-center justify-center w-full max-w-sm mr-8">
        {/* Círculos concéntricos suaves */}
        <div className="relative w-64 h-64 flex items-center justify-center group">
           <div className="absolute inset-0 border-[1.5px] border-white/20 rounded-full group-hover:scale-105 transition-transform duration-700"></div>
           <div className="absolute inset-6 border border-white/10 rounded-full group-hover:scale-95 transition-transform duration-700"></div>
           
           {/* Ícono central */}
           <div className="relative w-36 h-36 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-2xl group-hover:bg-white/20 transition-colors duration-500">
              <Scissors size={56} strokeWidth={1.5} className="text-white drop-shadow-lg" />
           </div>

           {/* Pequeñas etiquetas flotantes (monocromáticas) */}
           <div className="absolute top-2 -right-8 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/30 shadow-xl transform rotate-6 hover:rotate-0 transition-transform">
              <span className="text-xs font-black uppercase tracking-widest text-white">Premium</span>
           </div>
           
           <div className="absolute bottom-4 -left-12 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/30 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform">
              <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-white">
                 <Star size={14} className="fill-white" /> Top Quality
              </span>
           </div>
        </div>
      </div>
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
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