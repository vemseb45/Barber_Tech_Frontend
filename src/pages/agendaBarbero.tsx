import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Importamos para el botón de volver
import "../index.css";

// Interfaz para la información que viene de la base de datos
interface CitaPendiente {
  id: number;
  cliente: string;
  fecha: string;
  hora: string;
  servicio: string;
}

export default function AgendaBarbero() {
  // Datos simulados (MOCK). Luego vendrán de tu API
  const [citasDelDia] = useState<CitaPendiente[]>([
    { id: 101, cliente: "Juan Pérez", fecha: "2026-03-20", hora: "10:00 AM", servicio: "Corte Clásico" },
    { id: 102, cliente: "Mario Gómez", fecha: "2026-03-20", hora: "11:30 AM", servicio: "Corte y Barba" },
    { id: 103, cliente: "Luis Ramírez", fecha: "2026-03-20", hora: "02:00 PM", servicio: "Corte Fade" },
  ]);

  const [fechaFiltro, setFechaFiltro] = useState<string>(new Date().toISOString().split('T')[0]);

  return (
    // 1. ENVOLVEMOS TODO EN LA CLASE DE LA LANDING PAGE
    <div className="landing-page py-12 px-4 sm:px-6 flex flex-col items-center justify-center min-h-screen">
      
      {/* Botón para volver al Dashboard del Barbero */}
      <div className="w-full max-w-4xl mb-4">
        <Link to="/DashboardBarbero" className="text-primary font-bold hover:underline flex items-center gap-2 w-fit">
          ← Volver al Panel
        </Link>
      </div>

      {/* 2. TARJETA FLOTANTE CON SOPORTE DARK MODE */}
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mi Agenda</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Revisa tus citas programadas</p>
          </div>
          
          {/* Filtro de fecha para el barbero */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <label className="font-semibold text-slate-700 dark:text-slate-200">Ver día:</label>
            <input 
              type="date" 
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
              className="p-1 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-900 dark:text-white font-medium"
            />
          </div>
        </div>

        {/* Lista de citas */}
        {citasDelDia.length === 0 ? (
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
                // Un pequeño efecto "group" para que los botones aparezcan al pasar el mouse
                className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all duration-300 bg-slate-50 dark:bg-slate-800 flex justify-between items-center group"
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-sm rounded-full mb-3 shadow-sm">
                    {cita.hora}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">{cita.cliente}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{cita.servicio}</p>
                </div>
                
                {/* Botones de acción */}
                <div className="flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm">
                    ✓ Atendido
                  </button>
                  <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm">
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