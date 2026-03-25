import { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  Ban, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  Filter
} from 'lucide-react';

interface CitaPendiente {
  cedula: string;
  cliente: string;
  servicio: string;
  fecha: Date;
  precio: number;
}

export default function ViewPendientes() {
  const [citas, setCitas] = useState<CitaPendiente[]>([]);
  const [tiempoActual, setTiempoActual] = useState(new Date());

  // Funciones formateadoras
  const formatearHora = (fecha: Date) => {
    return fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const formatearDia = (fecha: Date) => {
    const ahora = new Date();
    if (fecha.getDate() === ahora.getDate() && fecha.getMonth() === ahora.getMonth()) {
      return "Hoy";
    }
    const mañana = new Date();
    mañana.setDate(mañana.getDate() + 1);
    if (fecha.getDate() === mañana.getDate()) {
      return "Mañana";
    }
    return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Inicializar citas redondeadas
  useEffect(() => {
    const ahora = new Date();

    const getRoundTime = (hoursOffset: number, minuteFixed: number = 0, addDay: number = 0) => {
      const d = new Date(ahora);
      d.setDate(d.getDate() + addDay);
      d.setHours(d.getHours() + hoursOffset, minuteFixed, 0, 0);
      
      // Si por la hora actual resulta ser en el pasado o faltan menos de 1 minuto, lo adelantamos
      if (d.getTime() <= ahora.getTime()) {
        d.setHours(d.getHours() + 1);
      }
      return d;
    };

    setCitas([
      { cedula: "1723456789", cliente: "Marcos Medina", servicio: "Corte Clásico + Lavado", fecha: getRoundTime(1, 0), precio: 25.0 },
      { cedula: "0912345678", cliente: "Julian Álvarez", servicio: "Perfilado de Barba", fecha: getRoundTime(2, 30), precio: 15.0 },
      { cedula: "1109876543", cliente: "Roberto Sánchez", servicio: "Corte Degradado + Tinte", fecha: getRoundTime(3, 0), precio: 60.0 },
      { cedula: "2104561234", cliente: "Andrés Gomez", servicio: "Corte de Niño", fecha: getRoundTime(5, 30), precio: 15.0 },
      { cedula: "0103216548", cliente: "Mateo Cruz", servicio: "Masaje Capilar", fecha: getRoundTime(6, 0), precio: 20.0 },
      { cedula: "1719876542", cliente: "David Lopez", servicio: "Diseño", fecha: getRoundTime(9, 30, 1), precio: 10.0 },
      { cedula: "0921478523", cliente: "Tomas Herrero", servicio: "Corte + Barba", fecha: getRoundTime(11, 0, 1), precio: 35.0 },
    ].sort((a, b) => a.fecha.getTime() - b.fecha.getTime()));
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoActual(new Date());
    }, 60000);
    return () => clearInterval(intervalo);
  }, []);

  const handleCancelar = (cita: CitaPendiente) => {
    const diferenciaMs = cita.fecha.getTime() - tiempoActual.getTime();
    if (diferenciaMs / 3600000 <= 1) {
      alert("⚠️ El sistema bloquea cancelaciones con menos de 1 hora de anticipación. Por favor, comunícate con administración.");
      return;
    }
    if (window.confirm(`¿Seguro que deseas cancelar la cita de ${cita.cliente}?`)) {
      setCitas(citas.filter(c => c.cedula !== cita.cedula));
    }
  };

  const handleCompletar = (cedula: string, cliente: string) => {
    if (window.confirm(`¿Marcar la cita de ${cliente} como completada?`)) {
      setCitas(citas.filter(c => c.cedula !== cedula));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* HEADER PRINCIPAL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <CalendarDays className="text-primary" size={32} />
            Agenda de Servicios
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium text-sm">
            Administra tus citas confirmadas. Podrás cancelar siempre y cuando falte más de 1 hora.
          </p>
        </div>
        
        {/* BARRA DE BÚSQUEDA INTEGRADA EN EL HEADER */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar cita..." 
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm text-slate-700 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none shadow-sm transition-all"
            />
          </div>
          <button className="p-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-slate-600 dark:text-slate-300 font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all focus:outline-none">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* AVISO IMPORTANTE DE CANCELACIONES */}
      <div className="bg-blue-50/50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-4 flex items-start sm:items-center gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-500 rounded-xl shrink-0">
          <AlertTriangle size={20} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          <strong className="text-slate-800 dark:text-blue-400 mr-1">Políticas de Cancelación Activas:</strong> 
          No podrás anular una cita si falta 1 hora o menos para su hora de inicio. Para casos excepcionales, acude a recepción.
        </p>
      </div>

      {/* TABLA ULTRA LIMPIA */}
      <div className="bg-white dark:bg-[#1e293b] rounded-[32px] border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
        
        {citas.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-bold dark:text-white">Agenda Libre</h3>
            <p className="text-slate-500 mt-2 font-medium">No hay servicios pendientes en tu lista.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hora de Cita</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Servicio</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Estado</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {citas.map((cita) => {
                  const diferenciaMs = cita.fecha.getTime() - tiempoActual.getTime();
                  const faltanMinutos = Math.max(0, Math.floor(diferenciaMs / 60000));
                  const faltanHoras = Math.floor(faltanMinutos / 60);
                  const sePuedeCancelar = faltanMinutos > 60;
                  const esHoy = cita.fecha.getDate() === tiempoActual.getDate();
                  const muyProximo = faltanMinutos <= 60 && esHoy && faltanMinutos > 0;

                  return (
                    <tr key={cita.cedula} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                      
                      {/* HORA */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className={`text-sm font-black text-slate-800 dark:text-white`}>
                            {formatearHora(cita.fecha)}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {formatearDia(cita.fecha)}
                          </span>
                        </div>
                      </td>

                      {/* CLIENTE */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center font-black text-sm text-white ${muyProximo ? 'bg-rose-500 shadow-rose-500/20' : 'bg-primary shadow-primary/20'} shadow-sm shrink-0`}>
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

                      {/* SERVICIO */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {cita.servicio}
                        </span>
                      </td>

                      {/* ESTADO TIEMPO */}
                      <td className="px-6 py-5 text-center">
                        {muyProximo ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </span>
                            En {faltanMinutos} min
                          </span>
                        ) : faltanHoras < 24 && esHoy ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            Faltan {faltanHoras} hrs
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            En espera
                          </span>
                        )}
                      </td>

                      {/* ACCIONES - Minimalistas */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          
                          <button 
                            onClick={() => handleCompletar(cita.cedula, cita.cliente)}
                            title="Marcar como Completado"
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-emerald-500 hover:bg-emerald-500 hover:text-white dark:bg-slate-800 dark:hover:bg-emerald-500 transition-all font-bold group-hover:shadow-sm"
                          >
                            <CheckCircle2 size={18} />
                          </button>

                          <button 
                            onClick={() => handleCancelar(cita)}
                            disabled={!sePuedeCancelar}
                            title={!sePuedeCancelar ? "Bloqueado (< 1 hora)" : "Cancelar cita"}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all font-bold group-hover:shadow-sm ${
                              sePuedeCancelar 
                                ? 'bg-slate-100 text-red-500 hover:bg-red-500 hover:text-white dark:bg-slate-800 dark:hover:bg-red-500' 
                                : 'bg-slate-50 text-slate-300 dark:bg-slate-800/30 dark:text-slate-600 cursor-not-allowed'
                            }`}
                          >
                            <Ban size={18} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
