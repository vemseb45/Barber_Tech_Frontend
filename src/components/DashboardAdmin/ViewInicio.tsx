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
    },
    {
      label: 'Ingresos Mes',
      value: '$4,520.00',
      change: '+8.4%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Citas Hoy',
      value: '42',
      change: '5 pendientes',
      trend: 'neutral',
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all"
            style={{
              background: "var(--input-bg-custom)",
              borderColor: "rgba(255,255,255,0.08)"
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold mt-1" style={{ color: "var(--text-main)" }}>
                  {stat.value}
                </h3>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{
                  background: "rgba(133, 25, 210, 0.1)",
                  color: "var(--color-primary)"
                }}
              >
                <stat.icon size={24} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1">
              {stat.trend === 'up' && (
                <span className="flex items-center text-sm font-medium text-green-500">
                  <ArrowUpRight size={16} className="mr-1" />
                  {stat.change}
                </span>
              )}
              {stat.trend === 'neutral' && (
                <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                  {stat.change}
                </span>
              )}
              {stat.trend !== 'neutral' && (
                <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
                  vs mes pasado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* GRAFICO */}
        <div
          className="p-6 rounded-2xl border shadow-sm min-h-[350px] flex flex-col"
          style={{
            background: "var(--input-bg-custom)",
            borderColor: "rgba(255,255,255,0.08)"
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-lg" style={{ color: "var(--text-main)" }}>
              Rendimiento Semanal
            </h4>

            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1">
                <TrendingUp size={14} style={{ color: "var(--color-primary)" }} />
                Citas
              </span>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-2">
            {[40, 65, 50, 85, 70, 95, 60].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                
                <div
                  className="w-full rounded-t-lg transition-all duration-500 group-hover:shadow-lg relative"
                  style={{
                    height: `${height}%`,
                    background: "rgba(133, 25, 210, 0.3)"
                  }}
                >
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "#111",
                      color: "#fff"
                    }}
                  >
                    {height}
                  </div>
                </div>

                <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                  {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CITAS */}
        <div
          className="p-6 rounded-2xl border shadow-sm"
          style={{
            background: "var(--input-bg-custom)",
            borderColor: "rgba(255,255,255,0.08)"
          }}
        >
          <h4 className="font-bold text-lg mb-6" style={{ color: "var(--text-main)" }}>
            Citas Recientes
          </h4>

          <div className="space-y-4">
            {[
              { name: 'Juan Pérez', service: 'Corte de Cabello + Barba', time: '10:30 AM' },
              { name: 'Mario Gómez', service: 'Limpieza Facial', time: '11:15 AM' },
              { name: 'Luis Rivas', service: 'Corte Clásico', time: '12:00 PM' },
              { name: 'Ana Torres', service: 'Tratamiento Capilar', time: '01:30 PM' },
            ].map((cita, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl transition-colors group hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${cita.name}&background=8519d2&color=fff`}
                    alt={cita.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm" style={{ color: "var(--text-main)" }}>
                      {cita.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {cita.service}
                    </p>
                  </div>
                </div>

                <span
                  className="text-[10px] font-bold px-2 py-1 rounded-lg"
                  style={{
                    background: "rgba(133, 25, 210, 0.1)",
                    color: "var(--color-primary)"
                  }}
                >
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