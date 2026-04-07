import React, { useState } from 'react';
import { X, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../api/axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  barberoId: number;
  nombreBarbero: string;
}

const ModalAsignarHorario: React.FC<ModalProps> = ({ isOpen, onClose, barberoId, nombreBarbero }) => {
  const [dia, setDia] = useState('Lunes');
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('17:00');
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje(null);

    try {
      const response = await api.post('agenda/configurar/', {
        cedula_barbero: barberoId,
        dia: dia,
        hora_inicio: `${horaInicio}:00`, // Formato HH:MM:SS
        hora_fin: `${horaFin}:00`
      });

      if (response.data.success) {
        setMensaje({ type: 'success', text: '¡Horario guardado correctamente!' });
        setTimeout(() => {
          onClose();
          setMensaje(null);
        }, 1500);
      }
    } catch (err: any) {
      setMensaje({
        type: 'error',
        text: err.response?.data?.message || 'Error al guardar el horario'
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1e293b] w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50">

        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Configurar Horario</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Barbero: {nombreBarbero}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* SELECCIONAR DÍA */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={14} /> Día de la semana
            </label>
            <div className="grid grid-cols-4 gap-3">
              {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map((d, index) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDia(d)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap font-bold text-sm transition-all border
        ${dia === d
                      ? "bg-primary text-white border-primary shadow-lg scale-105"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }
        ${index >= 4 ? "col-span-1" : ""}
      `}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* HORA INICIO */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} /> Inicio
              </label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all dark:text-white font-bold"
              />
            </div>

            {/* HORA FIN */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} /> Fin
              </label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all dark:text-white font-bold"
              />
            </div>
          </div>

          {/* MENSAJES DE ESTADO */}
          {mensaje && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in zoom-in-95 ${mensaje.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-red-100 text-red-700 dark:bg-red-900/30'
              }`}>
              {mensaje.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {mensaje.text}
            </div>
          )}

          {/* BOTÓN GUARDAR */}
          <button
            type="submit"
            disabled={enviando}
            className="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-primary/20 active:scale-[0.98] flex justify-center items-center gap-2"
          >
            {enviando ? 'GUARDANDO...' : 'GUARDAR CONFIGURACIÓN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAsignarHorario;