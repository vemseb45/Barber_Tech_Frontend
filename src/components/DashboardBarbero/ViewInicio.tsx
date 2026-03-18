import {
  CalendarDays,
  TrendingUp,
  Star,
  UserPlus,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import type { BarberoView } from '../../types';

interface ViewInicioProps {
  onViewChange: (view: BarberoView) => void;
}

export default function ViewInicio({ onViewChange }: ViewInicioProps) {
  const stats = {
    citasHoy: 12,
    citasCrecimiento: 15,
    ganancias: 450.00,
    gananciasCrecimiento: 10,
    nuevosClientes: 4,
    clientesCrecimiento: 5
  };

  const proximasCitas = [
    {
      id: 1,
      hora: '09:00 AM',
      cliente: 'Juan Pérez',
      avatar: 'https://i.pravatar.cc/150?u=juan',
      servicio: 'Corte Clásico',
      estado: 'Confirmado',
      colorEstado: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 2,
      hora: '10:30 AM',
      cliente: 'Ricardo Gómez',
      avatar: 'https://i.pravatar.cc/150?u=ricardo',
      servicio: 'Arreglo de Barba',
      estado: 'Pendiente',
      colorEstado: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
    },
    {
      id: 3,
      hora: '11:45 AM',
      cliente: 'Luis Martínez',
      avatar: 'https://i.pravatar.cc/150?u=luis',
      servicio: 'Corte Degradado',
      estado: 'En Proceso',
      colorEstado: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    }
  ];

  const tipsDelDia = [
    "Planifica tu semana y revisa el inventario. ¡La preparación es clave!",
    "Recuerda a tus clientes frecuentes que agenden su cita.",
    "Día de mantenimiento: esteriliza tus herramientas a fondo.",
    "Promueve los servicios menos populares en tus redes sociales.",
    "Ofrece el combo 'Corte + Barba' con un pequeño incentivo.",
    "Viernes de alta demanda: mantén tu estación impecable.",
    "¡Recomienda productos de cuidado al terminar cada servicio!"
  ];

  const tipActual = tipsDelDia[new Date().getDay()];

  return (
    <div className="animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            ¡Hola, Carlos! 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Resumen para hoy, <span className="text-primary font-medium">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</span>.
          </p>
        </div>
        <button
          onClick={() => onViewChange('Citas')}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-sm hover:border-primary dark:hover:border-primary transition-all text-slate-700 dark:text-slate-200 shadow-sm"
        >
          <CalendarDays size={18} className="text-primary" />
          Ir a la Agenda
        </button>
      </div>

      {/* ESTADÍSTICAS REFINADAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Citas hoy', val: stats.citasHoy, inc: stats.citasCrecimiento, icon: CalendarDays, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Calificación', val: '4.9', inc: '+0.2', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Nuevos clientes', val: stats.nuevosClientes, inc: stats.clientesCrecimiento, icon: UserPlus, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
              <span className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon size={20} />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold dark:text-white">{item.val}</h3>
              <span className="text-emerald-500 text-sm font-bold flex items-center">
                <TrendingUp size={14} className="mr-1" />
                {typeof item.inc === 'number' ? `${item.inc}%` : item.inc}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PRÓXIMAS CITAS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Próximas Citas</h3>
            <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1 cursor-pointer">
              Ver todas <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-white dark:bg-[#1e293b] rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hora</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Servicio</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {proximasCitas.map((cita) => (
                    <tr key={cita.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-5 text-sm font-bold text-slate-700 dark:text-slate-200">{cita.hora}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img src={cita.avatar} alt={cita.cliente} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700" />
                          <span className="text-sm font-medium dark:text-white">{cita.cliente}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">{cita.servicio}</td>
                      <td className="px-6 py-5 text-right">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${cita.colorEstado}`}>
                          {cita.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MÉTRICAS DE SERVICIOS */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Populares</h3>
          <div className="bg-white dark:bg-[#1e293b] rounded-[24px] border border-slate-200 dark:border-slate-700/50 p-8 shadow-sm">
            <div className="space-y-6">
              {[
                { name: 'Corte Cabello', pct: 45 },
                { name: 'Recorte Barba', pct: 30 },
                { name: 'Combo Imperial', pct: 20 },
                { name: 'Facial', pct: 5 },
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold dark:text-white uppercase tracking-tighter">
                    <span>{s.name}</span>
                    <span className="text-primary">{s.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${s.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* TIP BOX */}
            <div className="mt-10 p-5 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/20 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-1.5 bg-primary rounded-lg text-white">
                  <Lightbulb size={16} />
                </div>
                <span className="text-sm font-bold text-primary">Tip del día</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed relative z-10 font-medium">
                "{tipActual}"
              </p>
              {/* Decoración sutil */}
              <div className="absolute -right-4 -bottom-4 text-primary/10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Lightbulb size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}