import React, { useState } from 'react';

// Definimos los tipos de datos para evitar errores de TypeScript
interface Barbero {
  id: number;
  nombre: string;
  especialidad: string;
}

export default function AgendaCitas() {
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<number | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>('');

  // Datos simulados (Esto luego vendrá de tu base de datos)
  const barberos: Barbero[] = [
    { id: 1, nombre: 'Carlos Ruiz', especialidad: 'Cortes Clásicos & Barba' },
    { id: 2, nombre: 'Andrés Gómez', especialidad: 'Degradados & Diseños' },
    { id: 3, nombre: 'Miguel Silva', especialidad: 'Asesoría de Imagen' },
  ];

  const bloquesDisponibles = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleConfirmar = () => {
    if (!barberoSeleccionado || !fechaSeleccionada || !horaSeleccionada) return;
    console.log({
      barberoId: barberoSeleccionado,
      fecha: fechaSeleccionada,
      hora: horaSeleccionada
    });
    alert('¡Cita pre-agendada con éxito! (Revisa la consola)');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-zinc-200 my-10 font-sans">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Reserva tu Espacio</h2>
        <p className="text-zinc-500 mt-2">Selecciona tu profesional y encuentra un horario disponible.</p>
      </div>

      {/* PASO 1: Selección de Barbero */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">1. Elige tu Barbero</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {barberos.map((barbero) => (
            <button
              key={barbero.id}
              onClick={() => {
                setBarberoSeleccionado(barbero.id);
                setFechaSeleccionada(''); // Resetea fecha y hora al cambiar de barbero
                setHoraSeleccionada('');
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                barberoSeleccionado === barbero.id
                  ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100'
              }`}
            >
              <p className="font-bold text-lg">{barbero.nombre}</p>
              <p className={`text-xs mt-1 ${barberoSeleccionado === barbero.id ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {barbero.especialidad}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* PASO 2: Selección de Fecha (Solo visible si hay barbero) */}
      {barberoSeleccionado && (
        <div className="mb-8 animate-fade-in">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">2. Selecciona el Día</h3>
          <input
            type="date"
            className="w-full sm:w-1/2 p-3 border-2 border-zinc-200 rounded-lg text-zinc-800 font-medium focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
            value={fechaSeleccionada}
            onChange={(e) => {
              setFechaSeleccionada(e.target.value);
              setHoraSeleccionada('');
            }}
          />
        </div>
      )}

      {/* PASO 3: Bloques de Tiempo (Solo visible si hay fecha) */}
      {fechaSeleccionada && (
        <div className="mb-10 animate-fade-in">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">3. Horarios Disponibles</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {bloquesDisponibles.map((hora) => (
              <button
                key={hora}
                onClick={() => setHoraSeleccionada(hora)}
                className={`py-3 px-2 rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                  horaSeleccionada === hora
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-md transform scale-105'
                    : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'
                }`}
              >
                {hora}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botón Final */}
      <button
        onClick={handleConfirmar}
        disabled={!barberoSeleccionado || !fechaSeleccionada || !horaSeleccionada}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
          barberoSeleccionado && fechaSeleccionada && horaSeleccionada
            ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg cursor-pointer'
            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
        }`}
      >
        Confirmar Cita
      </button>
    </div>
  );
}