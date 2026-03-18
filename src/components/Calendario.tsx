import { useState } from "react";

export interface Bloque {
  hora: string;
  hora_db: string; // Formato HH:MM:SS para Django
  estado: "disponible" | "ocupado";
}

interface CalendarioProps {
  horaSeleccionada: string;
  onSeleccionarHora: (hora: string, hora_db: string) => void;
  bloquesDelDia: Bloque[];
}

export default function Calendario({
  horaSeleccionada,
  onSeleccionarHora,
  bloquesDelDia
}: CalendarioProps) {

  // Estado vacío estilizado
  if (bloquesDelDia.length === 0) {
    return (
      <div className="bg-white dark:bg-white/5 p-10 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-xl shadow-black/5 text-center transition-all">
        <div className="text-4xl mb-3 opacity-20">🕒</div>
        <p className="text-slate-500 dark:text-slate-400 font-medium italic">
          No hay horarios disponibles para este día.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/5 p-8 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl shadow-black/[0.02] transition-colors">
      <div className="flex items-center gap-2 mb-6 ml-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <h3 className="text-xs font-black uppercase tracking-[2px] text-slate-400">Selecciona tu turno</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {bloquesDelDia.map((bloque) => {
          const isSelected = horaSeleccionada === bloque.hora;
          const isOccupied = bloque.estado === "ocupado";

          return (
            <button
              key={bloque.hora}
              disabled={isOccupied}
              onClick={() => onSeleccionarHora(bloque.hora, bloque.hora_db)}
              className={`
                relative group p-4 rounded-2xl text-sm font-black transition-all duration-300 overflow-hidden cursor-pointer
                ${isOccupied 
                  ? "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-transparent opacity-50" 
                  : isSelected
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105 z-10"
                    : "bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-primary hover:text-primary hover:bg-white dark:hover:bg-primary/10"
                }
              `}
            >
              {/* Efecto de brillo sutil en hover */}
              {!isOccupied && !isSelected && (
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              
              <span className="relative z-10">
                {isOccupied ? (
                  <span className="flex items-center justify-center gap-1">
                    <span className="text-[10px] uppercase opacity-60 italic">Ocupado</span>
                  </span>
                ) : (
                  bloque.hora
                )}
              </span>

              {/* Indicador de selección lateral */}
              {isSelected && (
                <div className="absolute right-2 top-2 w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Leyenda rápida */}
      <div className="mt-8 flex gap-6 px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md bg-primary"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md bg-slate-200 dark:bg-white/10"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Disponible</span>
        </div>
      </div>
    </div>
  );
}