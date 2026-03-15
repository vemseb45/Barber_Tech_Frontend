import { useState } from "react";

interface Bloque {
  hora: string;
  estado: "disponible" | "ocupado";
}

/* PROPS QUE RECIBE DEL PADRE (AgendaCitasCliente) */
interface CalendarioProps {
  horaSeleccionada: string;
  onSeleccionarHora: (hora: string) => void;
}

export default function Calendario({
  horaSeleccionada,
  onSeleccionarHora
}: CalendarioProps) {

  // Simulamos los horarios que traería la base de datos para el día seleccionado
  const bloquesDelDia: Bloque[] = [
    { hora: "09:00 AM", estado: "disponible" },
    { hora: "10:00 AM", estado: "ocupado" },
    { hora: "11:00 AM", estado: "disponible" },
    { hora: "12:00 PM", estado: "disponible" },
    { hora: "02:00 PM", estado: "ocupado" },
    { hora: "03:00 PM", estado: "disponible" },
    { hora: "04:00 PM", estado: "disponible" },
    { hora: "05:00 PM", estado: "disponible" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {bloquesDelDia.map((bloque) => (
          <button
            key={bloque.hora}
            disabled={bloque.estado === "ocupado"}
            onClick={() => onSeleccionarHora(bloque.hora)} // ← comunica al padre la hora
            className={`p-3 rounded-lg text-sm font-bold transition-all duration-300
              ${
                bloque.estado === "ocupado"
                  ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-transparent"
                  : horaSeleccionada === bloque.hora
                  ? "bg-primary text-white border-primary shadow-md transform scale-105" // Color de tu marca si está seleccionado
                  : "bg-white text-slate-700 border border-zinc-300 hover:border-primary hover:text-primary"
              }`}
          >
            {bloque.estado === "ocupado" ? "Ocupado" : bloque.hora}
          </button>
        ))}

      </div>
    </div>
  );
}