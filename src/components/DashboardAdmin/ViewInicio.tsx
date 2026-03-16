import React from 'react';
import { Users, DollarSign, Calendar, ArrowUpRight, TrendingUp } from 'lucide-react';

const ViewInicio: React.FC = () => {
  const stats = [
    {
      label: 'Usuarios Totales',
      value: '1,284',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      label: 'Ingresos Mes',
      value: '$4,520.00',
      change: '+8.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      label: 'Citas Hoy',
      value: '42',
      change: '5 pendientes',
      trend: 'neutral',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-1 dark:text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 ${stat.bgColor} ${stat.color} rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              {stat.trend === 'up' && (
                <span className="text-green-500 flex items-center text-sm font-medium">
                  <ArrowUpRight size={16} className="mr-1" />
                  {stat.change}
                </span>
              )}
              {stat.trend === 'neutral' && (
                <span className="text-slate-500 text-sm font-medium">{stat.change}</span>
              )}
              {stat.trend !== 'neutral' && (
                <span className="text-slate-400 text-xs ml-1">vs mes pasado</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[350px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-lg dark:text-white">Rendimiento Semanal</h4>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1"><TrendingUp size={14} className="text-primary" /> Citas</span>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-2">
            {[40, 65, 50, 85, 70, 95, 60].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="bg-primary/20 w-full rounded-t-lg transition-all duration-300 group-hover:bg-primary relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h4 className="font-bold text-lg mb-6 dark:text-white">Citas Recientes</h4>
          <div className="space-y-4">
            {[
              { name: 'Juan Pérez', service: 'Corte de Cabello + Barba', time: '10:30 AM', status: 'Confirmado', color: 'bg-green-100 text-green-700' },
              { name: 'Mario Gómez', service: 'Limpieza Facial', time: '11:15 AM', status: 'Pendiente', color: 'bg-blue-100 text-blue-700' },
              { name: 'Luis Rivas', service: 'Corte Clásico', time: '12:00 PM', status: 'En espera', color: 'bg-orange-100 text-orange-700' },
              { name: 'Ana Torres', service: 'Tratamiento Capilar', time: '01:30 PM', status: 'Confirmado', color: 'bg-green-100 text-green-700' },
            ].map((cita, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://picsum.photos/seed/${cita.name}/100/100`}
                    alt={cita.name}
                    className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-medium text-sm dark:text-white">{cita.name}</p>
                    <p className="text-xs text-slate-500">{cita.service}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${cita.color}`}>
                  {cita.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInicio;
