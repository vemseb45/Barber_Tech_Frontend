import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, CheckCircle2, XCircle, Coffee } from "lucide-react";

interface Cita {
  id: number;
  cedula_cliente_id: string;
  fecha: string;
  hora: string;
  id_servicio: number;
}

export default function ViewCitas() {
  const [citasDelDia, setCitasDelDia] = useState<Cita[]>([]);
  const [fechaFiltro, setFechaFiltro] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cargando, setCargando] = useState<boolean>(false);

  // ID del barbero logueado
  const miIdBarbero = "4";

  useEffect(() => {
    setCargando(true);
    fetch(`http://127.0.0.1:8000/api/agenda/miAgenda/?barberoId=${miIdBarbero}&fecha=${fechaFiltro}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCitasDelDia(data);
        else setCitasDelDia([]);
      })
      .catch(() => setCitasDelDia([]))
      .finally(() => setCargando(false));
  }, [fechaFiltro]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* CABECERA Y FILTRO REFINADO */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-slate-200 dark:border-slate-700/50 shadow-sm">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Calendar className="text-primary" size={28} />
            Mi Agenda
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestiona tus compromisos del día de manera eficiente.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-2 pl-5 rounded-2xl border border-slate-200 dark:border-slate-700 w-full lg:w-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha:</span>
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="bg-transparent text-slate-900 dark:text-white font-bold outline-none cursor-pointer p-2"
          />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="min-h-[400px]">
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-medium">Sincronizando agenda...</p>
          </div>
        ) : citasDelDia.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-slate-50 dark:bg-white/5 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-700/50"
          >
            <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-400">
              <Coffee size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">No tienes citas programadas</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-sm">
              Parece que tienes tiempo libre. ¡Aprovecha para descansar o revisar tu inventario!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {citasDelDia.map((cita, index) => (
                <motion.div
                  key={cita.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white dark:bg-[#1e293b] p-6 rounded-[28px] border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Decoración lateral de hora */}
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary/20 group-hover:bg-primary transition-colors"></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white leading-none">{cita.hora}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cita #{cita.id}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                       <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Servicio {cita.id_servicio}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Cédula Cliente</p>
                        <p className="font-bold text-slate-700 dark:text-slate-200">{cita.cedula_cliente_id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Acciones de la Cita */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-xl font-bold text-xs transition-all cursor-pointer">
                      <CheckCircle2 size={16} /> Finalizar
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-xl font-bold text-xs transition-all cursor-pointer">
                      <XCircle size={16} /> Cancelar
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}