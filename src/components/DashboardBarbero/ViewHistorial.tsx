
import { History, CheckCircle2, DollarSign, CalendarCheck } from 'lucide-react';

export default function ViewHistorial() {
  const serviciosRealizados = [
    {
      cedula: "1723456789",
      cliente: "Martín Rojas",
      servicio: "Corte Degradado + Barba",
      fecha: "Hoy, 10:30 AM",
      precio: 35.00,
      estado: "Completado",
      avatar: "https://i.pravatar.cc/150?u=martin",
    },
    {
      cedula: "0912345678",
      cliente: "Andrés Silva",
      servicio: "Corte Clásico",
      fecha: "Ayer, 16:00 PM",
      precio: 25.00,
      estado: "Completado",
      avatar: "https://i.pravatar.cc/150?u=andres",
    },
    {
      cedula: "1109876543",
      cliente: "Felipe Morales",
      servicio: "Perfilado de Barba",
      fecha: "Ayer, 14:15 PM",
      precio: 15.00,
      estado: "Completado",
      avatar: "https://i.pravatar.cc/150?u=felipe",
    },
    {
      cedula: "2104561234",
      cliente: "Tomás Herrera",
      servicio: "Corte de Niño",
      fecha: "23 de Mar, 11:00 AM",
      precio: 15.00,
      estado: "Completado",
      avatar: "https://i.pravatar.cc/150?u=tomas",
    },
    {
      cedula: "0103216548",
      cliente: "Diego Castro",
      servicio: "Tinte Global",
      fecha: "22 de Mar, 09:30 AM",
      precio: 45.00,
      estado: "Completado",
      avatar: "https://i.pravatar.cc/150?u=diego",
    }
  ];

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
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
          <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm">Todos</button>
          <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">Esta Semana</button>
          <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">Este Mes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm col-span-1 lg:col-span-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Generado (Mes)</p>
            <h3 className="text-3xl font-black text-emerald-500">$1,245.00</h3>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
            <DollarSign size={28} strokeWidth={2.5} />
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Servicios Hoy</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white">1</h3>
          </div>
          <div className="p-4 bg-primary/10 rounded-2xl text-primary">
            <CalendarCheck size={28} strokeWidth={2.5} />
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Clientes</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white">48</h3>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
            <CheckCircle2 size={28} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-[32px] border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Fecha y Hora</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Servicio</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Monto</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {serviciosRealizados.map((item) => (
                <tr key={item.cedula} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {item.fecha}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img src={item.avatar} alt={item.cliente} className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 group-hover:scale-105 transition-transform" />
                      <span className="text-sm font-bold text-slate-800 dark:text-white">{item.cliente}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300">
                      {item.servicio}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-sm font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                      +${item.precio.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      <CheckCircle2 size={12} strokeWidth={3} />
                      {item.estado}
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
