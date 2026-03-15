import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../index.css";

// Interfaz ajustada a los campos reales de tu base de datos
interface Cita {
  id: number;
  cedula_cliente_id: string;
  fecha: string;
  hora: string;
  id_servicio: number;
}

export default function AgendaBarbero() {
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
    <div className="landing-page py-12 px-4 sm:px-6 flex flex-col items-center justify-center min-h-screen">
      {/* Botón Volver */}
      <div className="w-full max-w-4xl mb-4">
        <Link to="/DashboardBarbero" className="text-primary font-bold hover:underline flex items-center gap-2 w-fit">
          ← Volver al Panel
        </Link>
      </div>

      <div className="w-full max-w-4xl p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10">
        {/* Cabecera y Filtro */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mi Agenda</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Revisa tus citas programadas</p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <label className="font-semibold text-slate-700 dark:text-slate-200">Ver día:</label>
            <input 
              type="date" 
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
              className="p-1 bg-transparent border-none focus:outline-none text-slate-900 dark:text-white font-medium"
            />
          </div>
        </div>

        {/* Listado de Citas */}
        {cargando ? (
           <p className="text-center text-slate-500 py-10">Cargando citas...</p>
        ) : citasDelDia.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No tienes citas agendadas para este día. ¡Tómate un café! ☕</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {citasDelDia.map((cita, index) => (
              <motion.div 
                key={cita.id}
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }}
                className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all duration-300 bg-slate-50 dark:bg-slate-800 flex justify-between items-center group"
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-sm rounded-full mb-3 shadow-sm">
                    {cita.hora}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    Cliente: {cita.cedula_cliente_id}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Servicio ID: {cita.id_servicio}</p>
                </div>
                
                {/* Botones de Acción */}
                <div className="flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-lg hover:bg-green-200 transition-colors text-xs">
                    ✓ Atendido
                  </button>
                  <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold rounded-lg hover:bg-red-200 transition-colors text-xs">
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