import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import Calendario from "../components/Calendario";

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
            className={`p-4 rounded-xl border text-left transition ${barberoSeleccionado === barbero.id
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

          </motion.div>

        )}

      </AnimatePresence>

      {/* HORARIOS */}

      <AnimatePresence>

        {fechaSeleccionada && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >

            <Calendario
              horaSeleccionada={horaSeleccionada}
              onSeleccionarHora={(hora) => setHoraSeleccionada(hora)}
            />

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