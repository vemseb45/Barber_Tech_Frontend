import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, CheckCircle2, XCircle, Coffee, AlertTriangle } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface Cita {
  id: number;
  cedula_cliente_id: string;
  fecha: string;
  hora: string;
  id_servicio: number;
  estado?: string; // puede venir o no
}

interface JwtPayload {
  user_id: string;
}

export default function ViewCitas() {
  const [citasDelDia, setCitasDelDia] = useState<Cita[]>([]);
  const [fechaFiltro, setFechaFiltro] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [miIdBarbero, setMiIdBarbero] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.user_id) {
        setMiIdBarbero(String(decoded.user_id));
      }
    } catch (error) {
      console.error("Error decodificando token");
    }
  }, []);

  const handleFinalizar = async (id: number) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cita/finalizar/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + (data.message || "No se pudo finalizar"));
        return;
      }

      setCitasDelDia(prev => prev.filter(c => c.id !== id));

    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  useEffect(() => {
    if (!miIdBarbero) return;

    setCargando(true);
    fetch(`http://127.0.0.1:8000/api/agenda/miAgenda/?barberoId=${miIdBarbero}&fecha=${fechaFiltro}`)
      .then(res => res.json())
      .then(response => {
        let citas: Cita[] = [];

        if (response.success && Array.isArray(response.data)) {
          citas = response.data;
        } else if (Array.isArray(response)) {
          citas = response;
        }

        // 🔥 FIX INTELIGENTE
        const tieneEstado = citas.length > 0 && 'estado' in citas[0];

        const resultado = tieneEstado
          ? citas.filter(c => c.estado === 'PENT')
          : citas; // 👈 si no viene estado, NO filtra

        setCitasDelDia(resultado);
      })
      .catch(() => setCitasDelDia([]))
      .finally(() => setCargando(false));
  }, [fechaFiltro, miIdBarbero]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* CABECERA */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-slate-200 dark:border-slate-700/50 shadow-sm">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Calendar className="text-primary" size={28} />
            Mi Agenda
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestiona tus compromisos del día de manera eficiente.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-2 pl-5 rounded-2xl border border-slate-200 dark:border-slate-700 w-full lg:w-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha:</span>
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="bg-transparent text-slate-900 dark:text-white font-bold outline-none cursor-pointer p-2"
          />
        </div>
      </div>

      {/* ALERTA */}
      <div className="bg-blue-50/50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-4 flex items-start sm:items-center gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-500 rounded-xl shrink-0">
          <AlertTriangle size={20} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          <strong className="text-slate-800 dark:text-blue-400 mr-1">Políticas de Cancelación Activas:</strong> 
          No podrás anular una cita si falta 1 hora o menos para su hora de inicio.
        </p>
      </div>

      {/* CONTENIDO */}
      <div className="min-h-[400px]">
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-medium">Sincronizando agenda...</p>
          </div>
        ) : citasDelDia.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-slate-50 dark:bg-white/5 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-700/50"
          >
            <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-400">
              <Coffee size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">No tienes citas programadas</h3>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {citasDelDia.map((cita, index) => (
                <motion.div key={cita.id} layout className="group bg-white dark:bg-[#1e293b] p-6 rounded-[28px] border">
                  
                  <p className="text-xl font-bold">{cita.hora}</p>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={() => handleFinalizar(cita.id)}
                      className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-xl font-bold text-xs"
                    >
                      <CheckCircle2 size={16} /> Finalizar  
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-xl font-bold text-xs">
                      <XCircle size={16} /> Cancelar
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}