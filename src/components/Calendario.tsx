import { useState } from "react";

interface Bloque {
  hora: string;
  estado: "disponible" | "ocupado";
}

interface DiaAgenda {
  dia: string;
  fecha: string;
  bloques: Bloque[];
}

/* PROPS QUE RECIBE DEL PADRE */

interface CalendarioProps {
  horaSeleccionada: string;
  onSeleccionarHora: (hora: string) => void;
}

export default function Calendario({
  horaSeleccionada,
  onSeleccionarHora
}: CalendarioProps) {

  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  const agenda: DiaAgenda[] = [
    {
      dia: "Lunes",
      fecha: "15",
      bloques: [
        { hora: "09:00", estado: "disponible" },
        { hora: "10:00", estado: "ocupado" },
        { hora: "11:00", estado: "disponible" },
        { hora: "12:00", estado: "disponible" },
        { hora: "14:00", estado: "ocupado" }
      ]
    },
    {
      dia: "Martes",
      fecha: "16",
      bloques: [
        { hora: "09:00", estado: "disponible" },
        { hora: "10:00", estado: "disponible" },
        { hora: "11:00", estado: "ocupado" },
        { hora: "12:00", estado: "disponible" },
        { hora: "14:00", estado: "disponible" }
      ]
    },
    {
      dia: "Miércoles",
      fecha: "17",
      bloques: [
        { hora: "09:00", estado: "ocupado" },
        { hora: "10:00", estado: "disponible" },
        { hora: "11:00", estado: "disponible" },
        { hora: "12:00", estado: "ocupado" },
        { hora: "14:00", estado: "disponible" }
      ]
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-zinc-200">

      <h2 className="text-2xl font-bold mb-6">
        Disponibilidad del barbero
      </h2>

      <div className="grid grid-cols-4 gap-4">

        {/* columna horas */}

        <div className="flex flex-col gap-3">

          <div className="h-10"></div>

          {agenda[0].bloques.map((b) => (
            <div
              key={b.hora}
              className="h-14 flex items-center text-sm text-zinc-500"
            >
              {b.hora}
            </div>
          ))}

        </div>

        {/* dias */}

        {agenda.map((dia) => (

          <div key={dia.dia} className="flex flex-col gap-3">

            {/* header */}

            <div className="text-center font-semibold">
              {dia.dia}
              <p className="text-xs text-zinc-500">
                {dia.fecha}
              </p>
            </div>

            {/* bloques */}

            {dia.bloques.map((bloque) => {

              const id = `${dia.dia}-${bloque.hora}`;

              return (

                <button
                  key={id}
                  disabled={bloque.estado === "ocupado"}
                  onClick={() => {
                    setSeleccionado(id);
                    onSeleccionarHora(bloque.hora); // ← comunica al padre
                  }}
                  className={`h-14 rounded-lg text-sm font-semibold transition
                  ${
                    bloque.estado === "ocupado"
                      ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                      : horaSeleccionada === bloque.hora
                      ? "bg-black text-white"
                      : "bg-zinc-50 hover:bg-zinc-100"
                  }`}
                >

                  {bloque.estado === "ocupado"
                    ? "Ocupado"
                    : bloque.hora}

                </button>

              );

            })}

          </div>

        ))}

      </div>

    </div>
  );
}