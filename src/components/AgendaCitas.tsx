import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion, AnimatePresence } from "framer-motion";

interface Barbero {
  id: number;
  nombre: string;
  especialidad: string;
}

export default function AgendaCitas() {
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<number | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>("");

  const barberos: Barbero[] = [
    { id: 1, nombre: "Carlos Ruiz", especialidad: "Cortes Clásicos & Barba" },
    { id: 2, nombre: "Andrés Gómez", especialidad: "Degradados & Diseños" },
    { id: 3, nombre: "Miguel Silva", especialidad: "Asesoría de Imagen" }
  ];

  const bloquesDisponibles = [
    "09:00",
    "10:00",
    "11:30",
    "14:00",
    "15:30",
    "17:00"
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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-zinc-200 my-10">

      <h2 className="text-3xl font-bold text-center mb-10">
        Reserva tu cita
      </h2>

      {/* BARBEROS */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

        {barberos.map((barbero) => (

          <motion.button
            whileHover={{ scale: 1.05 }}
            key={barbero.id}
            onClick={() => {
              setBarberoSeleccionado(barbero.id);
              setFechaSeleccionada(null);
              setHoraSeleccionada("");
            }}
            className={`p-4 rounded-xl border text-left transition ${
              barberoSeleccionado === barbero.id
                ? "bg-black text-white border-black"
                : "bg-zinc-50 hover:bg-zinc-100"
            }`}
          >
            <p className="font-bold text-lg">{barbero.nombre}</p>
            <p className="text-sm opacity-70">{barbero.especialidad}</p>
          </motion.button>

        ))}
      </div>

      {/* CALENDARIO */}

      <AnimatePresence>

        {barberoSeleccionado && (

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-10 flex justify-center"
          >

            <Calendar
              onChange={(value: any) => {
                setFechaSeleccionada(value);
                setHoraSeleccionada("");
              }}
              value={fechaSeleccionada}
              minDate={new Date()}
            />

          </motion.div>

        )}

      </AnimatePresence>

      {/* HORARIOS */}

      <AnimatePresence>

        {fechaSeleccionada && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 gap-3 mb-8"
          >

            {bloquesDisponibles.map((hora) => (

              <motion.button
                whileTap={{ scale: 0.9 }}
                key={hora}
                onClick={() => setHoraSeleccionada(hora)}
                className={`py-3 rounded-lg font-semibold border transition ${
                  horaSeleccionada === hora
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-zinc-100"
                }`}
              >
                {hora}

              </motion.button>

            ))}

          </motion.div>

        )}

      </AnimatePresence>

      {/* BOTON */}

      <button
        disabled={!barberoSeleccionado || !fechaSeleccionada || !horaSeleccionada}
        onClick={handleConfirmar}
        className="w-full py-4 bg-black text-white rounded-xl font-bold disabled:opacity-40"
      >
        Confirmar cita
      </button>

    </div>
  );
}