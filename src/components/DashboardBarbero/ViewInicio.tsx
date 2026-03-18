import {
  CalendarDays,
  TrendingUp,
  Star,
  UserPlus,
  Lightbulb
} from 'lucide-react';
import type { BarberoView } from '../../types';

interface ViewInicioProps {
  onViewChange: (view: BarberoView) => void;
}

export default function ViewInicio({ onViewChange }: ViewInicioProps) {

  // Datos simulados (mock data) en base a las tablas `cita` y `pagos` de la BD real.
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
      colorEstado: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    },
    {
      id: 2,
      hora: '10:30 AM',
      cliente: 'Ricardo Gómez',
      avatar: 'https://i.pravatar.cc/150?u=ricardo',
      servicio: 'Arreglo de Barba',
      estado: 'Pendiente',
      colorEstado: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    },
    {
      id: 3,
      hora: '11:45 AM',
      cliente: 'Luis Martínez',
      avatar: 'https://i.pravatar.cc/150?u=luis',
      servicio: 'Corte Degradado',
      estado: 'En Proceso',
      colorEstado: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      id: 4,
      hora: '01:00 PM',
      cliente: 'Carlos Ruiz',
      avatar: 'https://i.pravatar.cc/150?u=carlos',
      servicio: 'Limpieza Facial',
      estado: 'Confirmado',
      colorEstado: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    }
  ];

  const tipsDelDia = [
    "Aprovecha el domingo para planificar tu semana y revisar el inventario de productos. ¡La preparación es la clave del éxito!", // 0 = Domingo
    "Inicia la semana recordando a tus clientes frecuentes que agenden. Un buen mensaje de seguimiento puede llenar tu día.", // 1 = Lunes
    "Los martes son ideales para esterilizar a fondo todas tus herramientas. ¡La higiene resalta tu profesionalismo!", // 2 = Martes
    "A mitad de semana, evalúa qué servicios se venden menos y promuévelos en tus redes sociales con fotos de tus cortes.", // 3 = Miércoles
    "Los 'Combos' de Corte + Barba han aumentado últimamente. Considera ofrecer un pequeño descuento si agendan ambos.", // 4 = Jueves
    "Viernes de alta demanda: mantén tu estación organizada y tus máquinas a punto. ¡Brinda una experiencia ágil y precisa!", // 5 = Viernes
    "Los sábados son la oportunidad perfecta para la venta cruzada: ¡recomienda ceras, pomadas o aceites al terminar un corte!" // 6 = Sábado
  ];

  const tipActual = tipsDelDia[new Date().getDay()];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            ¡Hola, Carlos!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Aquí tienes el resumen para el día de hoy, {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onViewChange('Citas')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 shadow-sm"
          >
            <CalendarDays size={18} />
            Ver Agenda
          </button>
        </div>
      </div>

      {/* Estadisticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Citas de hoy</p>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
              <CalendarDays size={20} />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold dark:text-white">{stats.citasHoy}</h3>
            <span className="text-emerald-500 text-sm font-bold flex items-center">
              <TrendingUp size={16} className="mr-1" />
              {stats.citasCrecimiento}%
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Calificación</p>
            <span className="p-2 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/20">
              <Star size={20} />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold dark:text-white">4.9</h3>
            <span className="text-emerald-500 text-sm font-bold flex items-center">
              <TrendingUp size={16} className="mr-1" />
              +0.2
            </span>
            <span className="text-slate-400 text-sm ml-1">/ 5.0</span>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Nuevos clientes</p>
            <span className="p-2 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20">
              <UserPlus size={20} />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold dark:text-white">{stats.nuevosClientes}</h3>
            <span className="text-emerald-500 text-sm font-bold flex items-center">
              <TrendingUp size={16} className="mr-1" />
              {stats.clientesCrecimiento}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Tabla de citas */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold dark:text-white">Próximas Citas</h3>
            <a className="text-primary text-sm font-bold hover:underline" href="#">Ver todas</a>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Hora</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Cliente</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Servicio</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right whitespace-nowrap">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {proximasCitas.map((cita) => (
                    <tr key={cita.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {cita.hora}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img src={cita.avatar} alt={cita.cliente} className="w-8 h-8 rounded-full bg-slate-200" />
                          <span className="text-sm font-medium dark:text-white">{cita.cliente}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {cita.servicio}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${cita.colorEstado}`}>
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

        {/* Servicios */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold dark:text-white">Servicios más solicitados</h3>
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 shadow-sm h-full">

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-bold dark:text-white">
                <span>Corte de Cabello</span>
                <span className="text-primary">45%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-bold dark:text-white">
                <span>Recorte de Barba</span>
                <span className="text-primary">30%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-bold dark:text-white">
                <span>Corte + Barba</span>
                <span className="text-primary">20%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-bold dark:text-white">
                <span>Limpieza Facial</span>
                <span className="text-primary">5%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="text-primary" size={20} />
                <span className="text-sm font-bold text-primary">Tip del día</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {tipActual}
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
