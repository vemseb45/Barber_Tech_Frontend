import { useState, useEffect } from 'react';
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
  const [tiempoActual, setTiempoActual] = useState(new Date());
  const [proximasCitas, setProximasCitas] = useState<any[]>([]);

  const stats = {
    citasHoy: 12,
    citasCrecimiento: 15,
    ganancias: 450.00,
    gananciasCrecimiento: 10,
    nuevosClientes: 4,
    clientesCrecimiento: 5
  };

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
  const username = localStorage.getItem('username') || 'Barbero';

  // Reloj en tiempo real para hacer disminuir los minutos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoActual(new Date());
    }, 60000);
    return () => clearInterval(intervalo);
  }, []);

  // Inicializar citas simuladas basándose en la hora actual
  useEffect(() => {
    const ahora = new Date();
    const getRoundTime = (hoursOffset: number, minuteFixed: number = 0) => {
      const d = new Date(ahora);
      d.setHours(d.getHours() + hoursOffset, minuteFixed, 0, 0);
      if (d.getTime() <= ahora.getTime()) {
        d.setHours(d.getHours() + 1);
      }
      return d;
    };

    setProximasCitas([
      { cedula: "1723456789", cliente: "Marcos Medina", servicio: "Corte Clásico + Lavado", fecha: getRoundTime(1, 0), estadoBase: 'Confirmado' },
      { cedula: "0912345678", cliente: "Julian Álvarez", servicio: "Perfilado de Barba", fecha: getRoundTime(2, 30), estadoBase: 'Confirmado' },
      { cedula: "1109876543", cliente: "Roberto Sánchez", servicio: "Corte Degradado + Tinte", fecha: getRoundTime(3, 0), estadoBase: 'En Espera' }
    ]);
  }, []);

  const formatearHora = (fecha: Date) => {
    return fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            ¡Hola, {username}! 👋
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
        {/* PRÓXIMAS CITAS TIPO PENDIENTES */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Próximas Citas</h3>
            <button 
              onClick={() => onViewChange('Pendientes' as any)}
              className="text-primary text-sm font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Ver todas <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-white dark:bg-[#1e293b] rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hora</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Servicio</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {proximasCitas.map((cita) => {
                    const diferenciaMs = cita.fecha.getTime() - tiempoActual.getTime();
                    const faltanMinutos = Math.max(0, Math.floor(diferenciaMs / 60000));
                    const esHoy = cita.fecha.getDate() === tiempoActual.getDate();
                    const muyProximo = faltanMinutos <= 60 && esHoy && faltanMinutos > 0;
                    const colorAvatar = muyProximo ? 'bg-rose-500 shadow-rose-500/20' : 'bg-primary shadow-primary/20';

                    return (
                      <tr key={cita.cedula} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                        <td className="px-6 py-5">
                          <span className="text-sm font-black text-slate-800 dark:text-white">
                            {formatearHora(cita.fecha)}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center font-black text-sm text-white shadow-sm shrink-0 ${colorAvatar}`}>
                              {cita.cliente.charAt(0)}
                            </div>
                            <div>
                              <span className="text-sm font-bold text-slate-800 dark:text-white block">
                                {cita.cliente}
                              </span>
                              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                C.C: {cita.cedula}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {cita.servicio}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          {muyProximo ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                              </span>
                              En {faltanMinutos} min
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {cita.estadoBase}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
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