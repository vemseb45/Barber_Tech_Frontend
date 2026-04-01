import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, User, Scissors, CheckCircle2, Receipt } from "lucide-react";

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  servicio: { nombre: string; precio: string };
  cedula_barbero: { username: string };
}

const ViewTerminadas = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/cita/terminadas/cliente/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener el historial");
        const data = await res.json();
        setCitas(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCitas();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Receipt className="w-5 h-5 text-slate-500" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Historial de Citas
          </h2>
        </div>
        <p className="text-slate-500 font-medium ml-11">Registro de tus visitas finalizadas</p>
      </header>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-3 h-3 bg-primary/40 rounded-full"
              />
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl text-red-600 text-center">
          {error}
        </div>
      )}

      {!loading && citas.length === 0 && (
        <div className="text-center py-20 opacity-60">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-bold text-slate-400">Aún no tienes un historial</p>
          <p className="text-sm">Tus citas completadas aparecerán aquí.</p>
        </div>
      )}

      <div className="grid gap-4">
        <AnimatePresence>
          {citas.map((cita, index) => (
            <motion.div
              key={cita.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 rounded-3xl p-5 border border-slate-100 dark:border-slate-700/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex flex-1 items-center gap-5">
                  {/* Icono de estado */}
                  <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-500/10 items-center justify-center text-green-600 dark:text-green-500 shrink-0">
                    <CheckCircle2 size={24} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2 flex-1">
                    {/* Servicio y Barbero principal */}
                    <div className="col-span-1 md:col-span-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Servicio</p>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate">
                        {cita.servicio?.nombre || "Corte Standard"}
                      </h4>
                    </div>

                    <div className="col-span-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Barbero</p>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <User size={14} className="text-slate-400" />
                        <span className="text-sm font-semibold">{cita.cedula_barbero?.username}</span>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Fecha</p>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <CalendarDays size={14} className="text-slate-400" />
                        <span className="text-sm font-semibold">{cita.fecha}</span>
                      </div>
                    </div>

                    <div className="col-span-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Hora</p>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm font-semibold">{cita.hora}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge de Precio/Estado Final */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end border-t sm:border-none pt-3 sm:pt-0">
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    ${Number(cita.servicio?.precio).toLocaleString()}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-slate-200/50 dark:bg-slate-700 text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                    Finalizada
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ViewTerminadas;