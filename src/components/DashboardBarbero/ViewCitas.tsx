import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  // 🚨 ID del barbero logueado. 
  // Para pruebas usa "4" (destrozamamis) o "5" (niok223) que están en tu DB.
  const miIdBarbero = "4";

  useEffect(() => {
    setCargando(true);
    // La URL debe ser /miAgenda/ como definimos en urls.py
    fetch(`http://127.0.0.1:8000/api/agenda/miAgenda/?barberoId=${miIdBarbero}&fecha=${fechaFiltro}`)
      .then(res => res.json())
      .then(data => {
        console.log("Citas recibidas del servidor:", data);
        if (Array.isArray(data)) {
          setCitasDelDia(data);
        } else {
          setCitasDelDia([]);
        }
      })
      .catch(err => {
        console.error("Error trayendo agenda:", err);
        setCitasDelDia([]);
      })
      .finally(() => setCargando(false));
  }, [fechaFiltro]);

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-background-dark/40 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        {/* Cabecera y Filtro */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mi Agenda</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Revisa tus citas programadas para el día</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Seleccionar fecha:</label>
            <input
              type="date"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
              className="p-1 px-2 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-medium"
            />
          </div>
        </div>

        {/* Listado de Citas */}
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Cargando agenda...</p>
          </div>
        ) : citasDelDia.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <span className="text-4xl block mb-4">☕</span>
            <p className="text-slate-700 dark:text-slate-300 text-lg font-bold mb-2">No hay citas para este día</p>
            <p className="text-slate-500 dark:text-slate-400">Excelente momento para un descanso o acomodar las herramientas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {citasDelDia.map((cita, index) => (
              <motion.div
                key={cita.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:border-primary/50 transition-all duration-300 bg-white dark:bg-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
              >
                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary font-bold text-sm rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                      {cita.hora}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">ID Cita: #{cita.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                    CC Cliente: <span className="text-primary">{cita.cedula_cliente_id}</span>
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Servicio Requerido: <span className="text-slate-800 dark:text-slate-200 font-bold">Ref #{cita.id_servicio}</span></p>
                </div>

                {/* Botones de Acción */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 font-bold rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/30 transition-colors text-xs text-center">
                    ✓ Marcar Atendido
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-50 dark:bg-slate-800 text-red-600 font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 border border-slate-200 dark:border-slate-700 transition-colors text-xs text-center">
                    ✕ Cancelar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
