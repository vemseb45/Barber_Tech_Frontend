import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Calendario from "../components/Calendario";
import type { Bloque } from "../components/Calendario"; 
import "../index.css";

interface Barbero {
  id: string;
  nombre: string;
  especialidad: string;
}

export default function AgendaCitasCliente() {
  const [barberos, setBarberos] = useState<Barbero[]>([]);
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<string | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(""); 
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>("");
  const [horaDbSeleccionada, setHoraDbSeleccionada] = useState<string>("");
  const [bloquesDisponibles, setBloquesDisponibles] = useState<Bloque[]>([]);
  
  const navigate = useNavigate();

  // 1. CARGAR BARBEROS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/agenda/barberos/")
      .then(res => res.json())
      .then(data => setBarberos(data))
      .catch(err => console.error("Error cargando barberos:", err));
  }, []);

  // 2. CARGAR DISPONIBILIDAD
  useEffect(() => {
    if (barberoSeleccionado && fechaSeleccionada) {
      fetch(`http://127.0.0.1:8000/api/agenda/disponibilidad/?barberoId=${barberoSeleccionado}&fecha=${fechaSeleccionada}`)
        .then(res => res.json())
        .then(data => {
          // El backend ahora envía [{hora: "...", hora_db: "..."}]
          setBloquesDisponibles(Array.isArray(data) ? data : []);
        })
        .catch(err => console.error("Error cargando horas:", err));
    }
  }, [barberoSeleccionado, fechaSeleccionada]);

  // 3. ENVIAR LA CITA (Aquí estaba el 400)
  const handleConfirmar = async () => {
    // Validación extra para asegurar que nada vaya vacío
    const horaFinal = horaDbSeleccionada || horaSeleccionada;
    
    if (!barberoSeleccionado || !fechaSeleccionada || !horaFinal) {
      alert("Por favor selecciona todos los campos.");
      return;
    }

    const reservaData = {
      barberoId: String(barberoSeleccionado), // Aseguramos que sea texto
      fecha: fechaSeleccionada,
      hora_db: horaFinal, 
      cedula_cliente: "3030", // 🚨 Asegúrate de que este ID exista en tu tabla de usuarios
      id_servicio: 1 
    };

    console.log("Enviando paquete de reserva:", reservaData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/agenda/reservar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostramos el error exacto que nos da Django
        alert(data.error || "Error al agendar la cita");
        return;
      }

      alert("¡Cita agendada con éxito!");
      navigate("/DashboardCliente");

    } catch (error) {
      console.error("Error en POST:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="landing-page py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mb-4">
        <Link to="/DashboardCliente" className="text-primary font-bold hover:underline flex items-center gap-2 w-fit">
          ← Volver al inicio
        </Link>
      </div>

      <div className="w-full max-w-3xl p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-slate-900 dark:text-white">
          Reserva tu cita
        </h2>

        {/* 1. SELECCIONAR BARBERO */}
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">1. Elige tu Barbero</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {barberos.map((barbero) => (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              key={barbero.id}
              onClick={() => {
                setBarberoSeleccionado(barbero.id);
                setFechaSeleccionada(""); 
                setHoraSeleccionada(""); 
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                barberoSeleccionado === barbero.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}
            >
              <p className="font-bold">{barbero.nombre}</p>
              <p className="text-sm opacity-80">{barbero.especialidad}</p>
            </motion.button>
          ))}
        </div>

        {/* 2. SELECCIONAR FECHA */}
        {barberoSeleccionado && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">2. Selecciona el Día</h3>
            <input 
              type="date" 
              className="w-full sm:w-1/2 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              value={fechaSeleccionada}
              onChange={(e) => {
                setFechaSeleccionada(e.target.value);
                setHoraSeleccionada(""); 
              }}
              min={new Date().toISOString().split('T')[0]} 
            />
          </motion.div>
        )}

        {/* 3. SELECCIONAR HORARIOS */}
        {fechaSeleccionada && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">3. Selecciona la Hora</h3>
            <Calendario
              bloquesDelDia={bloquesDisponibles}
              horaSeleccionada={horaSeleccionada}
              onSeleccionarHora={(hora, hora_db) => {
                setHoraSeleccionada(hora);
                setHoraDbSeleccionada(hora_db); 
              }}
            />
          </motion.div>
        )}

        <button
          disabled={!barberoSeleccionado || !fechaSeleccionada || !horaSeleccionada}
          onClick={handleConfirmar}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg disabled:opacity-50 hover:brightness-110 transition-all shadow-xl shadow-primary/20"
        >
          Confirmar Cita
        </button>
      </div>
    </div>
  );
}