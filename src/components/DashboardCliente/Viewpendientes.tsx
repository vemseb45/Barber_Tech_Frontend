import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, User, Scissors } from "lucide-react";

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  servicio: any;
  cedula_barbero: any;
}

const ViewPendientes = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://127.0.0.1:8000/api/cita/pendientes/cliente/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Error al obtener citas");
        }

        const data = await res.json();

        // ✅ CORRECTO
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
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight dark:text-white">
          Citas Pendientes
        </h2>
        <p className="text-slate-500 text-sm">
          Aquí puedes ver tus próximas citas reservadas
        </p>
      </div>

      {loading && (
        <div className="text-center py-10 text-slate-500">
          Cargando citas...
        </div>
      )}

      {error && (
        <div className="text-center py-10 text-red-500">
          {error}
        </div>
      )}

      {!loading && citas.length === 0 && (
        <div className="text-center py-10 text-slate-400">
          No tienes citas pendientes
        </div>
      )}

      <div className="grid gap-4">
        {citas.map((cita) => (
          <motion.div
            key={cita.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2">

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />
                  {cita.fecha}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={16} />
                  {cita.hora}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Scissors size={16} />
                  {cita.servicio?.nombre || "Servicio"}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <User size={16} />
                  {cita.cedula_barbero?.username || "Barbero"}
                </div>

              </div>

              <div className="px-4 py-2 rounded-full text-xs font-bold bg-yellow-100 text-yellow-600">
                Pendiente
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ViewPendientes;