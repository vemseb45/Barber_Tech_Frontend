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

  const diasSemana = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];

  if (!isOpen) return null;

  // 🔥 CARGAR HORARIOS
  const cargarHorarios = async () => {
    setCargando(true);
    try {
      const res = await api.get(`agenda/configurar/?barberoId=${barberoId}`);

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

  // 🔥 CREAR DIRECTO (Asignar)
  const handleAsignarDirecto = async (diaSeleccionado: string) => {
    setEnviando(true);
    setMensaje(null);

    try {
      await api.post('agenda/configurar/', {
        cedula_barbero: barberoId,
        dia: diaSeleccionado,
        hora_inicio: `${horaInicio}:00`,
        hora_fin: `${horaFin}:00`
      });

      setMensaje({ type: 'success', text: `Horario asignado a ${diaSeleccionado}` });
      cargarHorarios();
    } catch (err: any) {
      setMensaje({
        type: 'error',
        text: err.response?.data?.message || 'Error al asignar'
      });
    } finally {
      setEnviando(false);
    }
  };

  // 🔥 GUARDAR / ACTUALIZAR
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje(null);

    try {
      if (editando) {
        await api.put(`agenda/configurar/${editando.id}/`, {
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

  // 🔥 MAPA POR DIA
  const mapaHorarios: any = {};
  horarios.forEach(h => {
    mapaHorarios[h.dia] = h;
  });

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">

      <div className="bg-white dark:bg-[#1e293b] w-full max-w-4xl max-h-[90vh] rounded-[28px] shadow-2xl border overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="p-4 sm:p-6 border-b flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">
              Horarios de {nombreBarbero}
            </h3>
          </div>

          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200">
            <X />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LISTADO */}
            <div className="space-y-3">

              {diasSemana.map((d) => {
                const h = mapaHorarios[d];

                return (
                  <div key={d} className="p-4 rounded-2xl border flex justify-between items-center">

                    <div>
                      <p className="font-bold">{d}</p>

                      {h ? (
                        <p className="text-xs flex items-center gap-1 text-slate-500">
                          <Clock size={12} />
                          {h.hora_inicio.slice(0, 5)} - {h.hora_fin.slice(0, 5)}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400">Sin horario</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {h ? (
                        <>
                          <button
                            onClick={() => handleEditar(h)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-xl"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            onClick={() => handleEliminar(h.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-xl"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      ) : (
                        <button
                          disabled={enviando}
                          onClick={() => handleAsignarDirecto(d)}
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-xl font-bold"
                        >
                          Asignar
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <h4 className="font-bold text-sm">
                {editando ? 'Editar horario' : 'Nuevo horario'}
              </h4>

              <select value={dia} onChange={e => setDia(e.target.value)} className="w-full p-3 border rounded-xl">
                {diasSemana.map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} className="p-3 border rounded-xl" />
                <input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} className="p-3 border rounded-xl" />
              </div>

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

              <button disabled={enviando} className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                {enviando ? "Guardando..." : "Guardar horario"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAsignarHorario;