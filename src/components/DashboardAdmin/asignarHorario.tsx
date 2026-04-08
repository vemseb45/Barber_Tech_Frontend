import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, AlertCircle, Trash2, Pencil } from 'lucide-react';
import api from '../../api/axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  barberoId: number;
  nombreBarbero: string;
}

interface Horario {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

const ModalAsignarHorario: React.FC<ModalProps> = ({ isOpen, onClose, barberoId, nombreBarbero }) => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [cargando, setCargando] = useState(false);

  const [editando, setEditando] = useState<Horario | null>(null);

  const [dia, setDia] = useState('Lunes');
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('17:00');

  const [mensaje, setMensaje] = useState<any>(null);
  const [enviando, setEnviando] = useState(false);

  if (!isOpen) return null;

  // 🔥 CARGAR HORARIOS
  const cargarHorarios = async () => {
    setCargando(true);
    try {
      const res = await api.get(`agenda/configurar/?barberoId=${barberoId}`);

      // 🚫 ELIMINAR DUPLICADOS POR DIA
      const unicos = Object.values(
        (res.data.data || []).reduce((acc: any, curr: Horario) => {
          acc[curr.dia] = curr;
          return acc;
        }, {})
      );

      setHorarios(unicos as Horario[]);
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (isOpen) cargarHorarios();
  }, [isOpen]);

  // 🔥 GUARDAR / ACTUALIZAR
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje(null);

    try {
      if (editando) {
        await api.put(`agenda/delet/${editando.id}/`, {
          cedula_barbero: barberoId,
          dia,
          hora_inicio: `${horaInicio}:00`,
          hora_fin: `${horaFin}:00`
        });
      } else {
        await api.post('agenda/configurar/', {
          cedula_barbero: barberoId,
          dia,
          hora_inicio: `${horaInicio}:00`,
          hora_fin: `${horaFin}:00`
        });
      }

      setMensaje({ type: 'success', text: 'Horario guardado correctamente' });

      setEditando(null);
      setDia('Lunes');
      setHoraInicio('08:00');
      setHoraFin('17:00');

      cargarHorarios();
    } catch (err: any) {
      setMensaje({
        type: 'error',
        text: err.response?.data?.message || 'Error al guardar'
      });
    } finally {
      setEnviando(false);
    }
  };

  // ✏️ EDITAR
  const handleEditar = (h: Horario) => {
    setEditando(h);
    setDia(h.dia);
    setHoraInicio(h.hora_inicio.slice(0, 5));
    setHoraFin(h.hora_fin.slice(0, 5));
  };

  // 🗑 ELIMINAR
  const handleEliminar = async (id: number) => {
    if (!confirm('¿Eliminar este horario?')) return;

    try {
      await api.delete(`agenda/configurar/${id}/`);
      cargarHorarios();
    } catch {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">

      <div className="bg-white dark:bg-[#1e293b] w-full max-w-4xl rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center bg-slate-50 dark:bg-slate-800/40">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Horarios de {nombreBarbero}
            </h3>
            <p className="text-xs text-slate-500">Gestiona disponibilidad</p>
          </div>

          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
            <X />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 p-6">

          {/* 🔥 LISTADO */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-500">Horarios actuales</h4>

            {cargando ? (
              <p className="text-slate-400 text-sm">Cargando...</p>
            ) : horarios.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed">
                <p className="text-sm font-semibold text-slate-500">
                  No hay horarios configurados
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  👉 Carga horarios o crea uno manualmente
                </p>
              </div>
            ) : (
              horarios.map((h) => (
                <div
                  key={h.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">{h.dia}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={12} />
                      {h.hora_inicio.slice(0, 5)} - {h.hora_fin.slice(0, 5)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditar(h)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:scale-105 transition"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      onClick={() => handleEliminar(h.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-xl hover:scale-105 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 🔥 FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <h4 className="font-bold text-sm text-slate-500">
              {editando ? 'Editar horario' : 'Nuevo horario'}
            </h4>

            
            {/* HORAS */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="time"
                value={horaInicio}
                onChange={e => setHoraInicio(e.target.value)}
                className="p-3 rounded-xl border focus:ring-2 focus:ring-primary"
              />
              <input
                type="time"
                value={horaFin}
                onChange={e => setHoraFin(e.target.value)}
                className="p-3 rounded-xl border focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* MENSAJE */}
            {mensaje && (
              <div className={`p-3 rounded-xl flex items-center gap-2 text-sm font-bold ${
                mensaje.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {mensaje.type === 'success'
                  ? <CheckCircle2 size={16} />
                  : <AlertCircle size={16} />}
                {mensaje.text}
              </div>
            )}

            <button
              disabled={enviando}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition"
            >
              {enviando
                ? "Guardando..."
                : editando
                ? "Actualizar horario"
                : "Guardar horario"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAsignarHorario;