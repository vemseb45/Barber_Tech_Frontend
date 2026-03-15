import { useState } from "react";

export interface Bloque {
  hora: string;
  hora_db: string; // El formato HH:MM:SS para Django
  estado: "disponible" | "ocupado";
}

interface CalendarioProps {
  horaSeleccionada: string;
  onSeleccionarHora: (hora: string, hora_db: string) => void;
  bloquesDelDia: Bloque[]; // Recibimos los bloques dinámicos del backend
}

export default function Calendario({
  horaSeleccionada,
  onSeleccionarHora,
  bloquesDelDia
}: CalendarioProps) {

  if (bloquesDelDia.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center text-slate-500">
        No hay horarios disponibles para este día.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {bloquesDelDia.map((bloque) => (
          <button
            key={bloque.hora}
            disabled={bloque.estado === "ocupado"}
            onClick={() => onSeleccionarHora(bloque.hora, bloque.hora_db)} // Enviamos ambas horas al padre
            className={`p-3 rounded-lg text-sm font-bold transition-all duration-300
              ${
                bloque.estado === "ocupado"
                  ? "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-transparent"
                  : horaSeleccionada === bloque.hora
                  ? "bg-primary text-white border-primary shadow-md transform scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:border-primary hover:text-primary"
              }`}
          >
            {bloque.estado === "ocupado" ? "Ocupado" : bloque.hora}
          </button>
        ))}
      </div>
    </div>
  );
}