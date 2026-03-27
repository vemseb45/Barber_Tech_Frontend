import { useState, useEffect } from "react";
import { History, XCircle, Ban, CalendarX } from 'lucide-react';
import { jwtDecode } from "jwt-decode";

interface CitaCancelada {
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

export default function ViewCanceladas() {
  const [citasCanceladas, setCitasCanceladas] = useState<CitaCancelada[]>([]);
  const [miIdBarbero, setMiIdBarbero] = useState<string | null>(null);

  // 🔥 Obtener ID del barbero desde el token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.user_id) {
        setMiIdBarbero(String(decoded.user_id));
      }
    } catch (error) {
      console.error("Error al decodificar el token");
    }
  }, []);

  // 🔥 Traer historial de citas CANCELADAS
  useEffect(() => {
    if (!miIdBarbero) return;

    // Nota: Asegúrate de que tu endpoint soporte filtrar por canceladas o cámbialo según tu API
    fetch(`http://127.0.0.1:8000/api/cita/historial/?barberoId=${miIdBarbero}&estado=CANC`)
      .then(res => res.json())
      .then(response => {
        if (response.success && Array.isArray(response.data)) {
          setCitasCanceladas(response.data);
        }
      })
      .catch(() => setCitasCanceladas([]));
  }, [miIdBarbero]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Ban className="text-red-500" size={28} />
            Citas Canceladas
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Listado de servicios que no se concretaron o fueron anulados.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border shadow-sm col-span-1 lg:col-span-2 flex justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Monto No Percibido</p>
            <h3 className="text-3xl font-black text-red-500">
              ${citasCanceladas.reduce((acc, s) => acc + s.precio, 0).toFixed(2)}
            </h3>
          </div>
          <div className="p-4 bg-red-500/10 rounded-2xl text-red-500">
            <CalendarX size={28} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border shadow-sm flex justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Canceladas</p>
            <h3 className="text-3xl font-black">{citasCanceladas.length}</h3>
          </div>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
             <XCircle size={28} className="text-slate-500" />
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white dark:bg-[#1e293b] rounded-[32px] border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-5 text-xs font-bold text-slate-400">Fecha / Hora</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400">Cliente</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400">Servicio solicitado</th>
                <th className="px-6 py-5 text-xs font-bold text-right text-slate-400">Precio Ref.</th>
                <th className="px-6 py-5 text-xs font-bold text-center text-slate-400">Estado</th>
              </tr>
            </thead>

            <tbody>
              {citasCanceladas.length > 0 ? (
                citasCanceladas.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-5 text-sm">{item.fecha} {item.hora}</td>
                    <td className="px-6 py-5 font-bold">{item.cliente}</td>
                    <td className="px-6 py-5">{item.servicio}</td>
                    <td className="px-6 py-5 text-right text-slate-400 font-medium">
                      ${item.precio.toFixed(2)}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <XCircle size={12} />
                        Cancelado
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No hay citas canceladas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}