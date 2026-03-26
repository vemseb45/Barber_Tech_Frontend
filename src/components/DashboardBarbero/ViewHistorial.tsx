import { useState, useEffect } from "react";
import { History, CheckCircle2, DollarSign, CalendarCheck } from 'lucide-react';
import { jwtDecode } from "jwt-decode";

interface ServicioRealizado {
  id: number;
  cliente: string;
  servicio: string;
  fecha: string;
  hora: string;
  precio: number;
}

interface JwtPayload {
  user_id: string;
}

export default function ViewHistorial() {
  const [serviciosRealizados, setServiciosRealizados] = useState<ServicioRealizado[]>([]);
  const [miIdBarbero, setMiIdBarbero] = useState<string | null>(null);

  // 🔥 Obtener ID del barbero
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.user_id) {
        setMiIdBarbero(String(decoded.user_id));
      }
    } catch (error) {
      console.error("Error token");
    }
  }, []);

  // 🔥 Traer historial (CONFIRMADAS)
  useEffect(() => {
    if (!miIdBarbero) return;

    fetch(`http://127.0.0.1:8000/api/cita/historial/?barberoId=${miIdBarbero}`)
      .then(res => res.json())
      .then(response => {
        if (response.success && Array.isArray(response.data)) {
          setServiciosRealizados(response.data);
        }
      })
      .catch(() => setServiciosRealizados([]));
  }, [miIdBarbero]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <History className="text-primary" size={28} />
            Servicios Realizados
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Historial de todos los servicios que has completado.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border shadow-sm col-span-1 lg:col-span-2 flex justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Generado</p>
            <h3 className="text-3xl font-black text-emerald-500">
              ${serviciosRealizados.reduce((acc, s) => acc + s.precio, 0).toFixed(2)}
            </h3>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
            <DollarSign size={28} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border shadow-sm flex justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Servicios</p>
            <h3 className="text-3xl font-black">{serviciosRealizados.length}</h3>
          </div>
          <CalendarCheck size={28} />
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white dark:bg-[#1e293b] rounded-[32px] border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-5 text-xs font-bold text-slate-400">Fecha</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400">Cliente</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400">Servicio</th>
                <th className="px-6 py-5 text-xs font-bold text-right text-slate-400">Monto</th>
                <th className="px-6 py-5 text-xs font-bold text-center text-slate-400">Estado</th>
              </tr>
            </thead>

            <tbody>
              {serviciosRealizados.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-5 text-sm">{item.fecha} {item.hora}</td>
                  <td className="px-6 py-5 font-bold">{item.cliente}</td>
                  <td className="px-6 py-5">{item.servicio}</td>
                  <td className="px-6 py-5 text-right text-emerald-500 font-bold">
                    +${item.precio.toFixed(2)}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 size={12} />
                      Completado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}