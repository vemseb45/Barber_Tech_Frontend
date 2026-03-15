import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Importamos Link por si quieres poner un botón de volver
import Calendario from "../components/Calendario"; 
import "../index.css";

interface Barbero {
  id: number;
  nombre: string;
  especialidad: string;
}

export default function AgendaCitasCliente() {
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<number | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(""); 
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>("");

  const barberos: Barbero[] = [
    { id: 1, nombre: "Carlos Ruiz", especialidad: "Cortes Clásicos & Barba" },
    { id: 2, nombre: "Andrés Gómez", especialidad: "Degradados & Diseños" },
    { id: 3, nombre: "Miguel Silva", especialidad: "Asesoría de Imagen" }
  ];

  const handleConfirmar = () => {
    if (!barberoSeleccionado || !fechaSeleccionada || !horaSeleccionada) return;

    console.log({
      barberoId: barberoSeleccionado,
      fecha: fechaSeleccionada,
      hora: horaSeleccionada
    });

    alert("Cita agendada correctamente");
  };

  return (
    // 1. ENVOLVEMOS TODO EN LA CLASE DE LA LANDING PAGE
    <div className="landing-page py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
      
      {/* Botón para volver al Dashboard (Opcional, pero muy útil) */}
      <div className="w-full max-w-3xl mb-4">
        <Link to="/DashboardCliente" className="text-primary font-bold hover:underline flex items-center gap-2 w-fit">
          ← Volver al inicio
        </Link>
      </div>

      {/* 2. TARJETA BLANCA FLOTANTE */}
      <div className="w-full max-w-3xl p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10">
        
        <h2 className="text-3xl font-extrabold text-center mb-10 text-slate-900 dark:text-white">
          Reserva tu cita
        </h2>

        {/* PASO 1. SELECCIONAR BARBERO */}
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">1. Elige tu Barbero</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {barberos.map((barbero) => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              key={barbero.id}
              onClick={() => {
                setBarberoSeleccionado(barbero.id);
                setFechaSeleccionada(""); 
                setHoraSeleccionada(""); 
              }}
              className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                barberoSeleccionado === barbero.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                  : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700"
              }`}
            >
              <p className={`font-bold text-lg ${barberoSeleccionado === barbero.id ? "text-white" : "text-slate-900 dark:text-white"}`}>
                {barbero.nombre}
              </p>
              <p className={`text-sm ${barberoSeleccionado === barbero.id ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                {barbero.especialidad}
              </p>
            </motion.button>
          ))}
        </div>

        {/* PASO 2. SELECCIONAR FECHA */}
        <AnimatePresence>
          {barberoSeleccionado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">2. Selecciona el Día</h3>
              <input 
                type="date" 
                className="w-full sm:w-1/2 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white transition-all"
                value={fechaSeleccionada}
                onChange={(e) => {
                  setFechaSeleccionada(e.target.value);
                  setHoraSeleccionada(""); 
                }}
                min={new Date().toISOString().split('T')[0]} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PASO 3. SELECCIONAR HORARIOS */}
        <AnimatePresence>
          {fechaSeleccionada && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">3. Selecciona la Hora</h3>
              <Calendario
                horaSeleccionada={horaSeleccionada}
                onSeleccionarHora={(hora: string) => setHoraSeleccionada(hora)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTON CONFIRMAR */}
        <button
          disabled={!barberoSeleccionado || !fechaSeleccionada || !horaSeleccionada}
          onClick={handleConfirmar}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5213fc] transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0 disabled:hover:translate-y-0"
        >
          Confirmar Cita
        </button>
      </div>
    </div>
  );
}