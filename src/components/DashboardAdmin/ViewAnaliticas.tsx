import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Users, DollarSign, Download, MoreVertical, Star, Loader2, AlertCircle } from 'lucide-react';
import { getAdminAnalytics } from '../../api/analiticas';
import type { AdminAnalyticsData } from '../../api/analiticas';

export default function ViewAnaliticas() {
  const [activeTab, setActiveTab] = useState('Últimos 30 días');
  const tabs = ['Últimos 30 días', 'Mes anterior', 'Este año'];

  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getAdminAnalytics(activeTab);
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Error al cargar las analíticas');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [activeTab]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-primary">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">Cargando analíticas...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">{error || 'No se pudieron cargar los datos.'}</p>
        <button
          onClick={() => setActiveTab(activeTab)}
          className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">

      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Sparkles className="text-primary" size={28} />
            Reportes y Estadísticas
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Visualiza el rendimiento financiero y operativo de tu negocio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                  ? 'bg-primary text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-2xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm text-slate-700 dark:text-slate-200">
            <Download size={16} />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-primary rounded-2xl">
              <DollarSign size={24} />
            </div>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={12} /> +15%
            </span>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">Total Ganado</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white">${data.total_ganado.toLocaleString('es-CO')}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
              <Users size={24} />
            </div>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={12} /> +8%
            </span>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">Clientes Nuevos</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white">{data.clientes_nuevos}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl">
              <DollarSign size={24} />
            </div>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">Valor promedio por día</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white">${data.valor_promedio_dia.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</h3>
          </div>
        </div>
      </div>

      {/* Sección del medio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-slate-100 dark:border-slate-700/50 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Ingresos Mensuales</h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><MoreVertical size={20} /></button>
          </div>

          <div className="flex-1 flex items-end justify-between gap-3 px-2">
            {data.chart_data.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div
                  className="w-full rounded-t-2xl transition-all duration-1000 ease-out relative bg-gradient-to-t from-slate-400 dark:from-white/20 to-primary shadow-sm border-t border-white/10"
                  style={{ height: `${val * 2.2}px` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 shadow-xl z-20 whitespace-nowrap">
                    {val}%
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400">{data.chart_labels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Servicios más populares */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Servicios más Populares</h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><MoreVertical size={20} /></button>
          </div>

          <div className="space-y-6">
            {data.popular_services.length === 0 ? (
              <p className="text-sm text-slate-500">No hay datos suficientes para mostrar.</p>
            ) : (
              data.popular_services.map((service, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{service.name}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{service.value}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div className={`${service.color} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${service.value}%` }}></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Tabla final */}
      <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Desempeño de Barberos</h3>
          <button className="text-primary text-sm font-bold hover:underline">Ver detalles</button>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <th className="pb-4 pl-2">Barbero</th>
                <th className="pb-4">Total Citas</th>
                <th className="pb-4">Productividad</th>
                <th className="pb-4">Rating Promedio</th>
                <th className="pb-4 text-right pr-2">Ingresos Gen.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {data.barbers_performance.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No se encontraron barberos con citas en este periodo.
                  </td>
                </tr>
              ) : (
                data.barbers_performance.map((barber, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <img src={barber.avatar} alt={barber.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{barber.name}</p>
                          <p className="text-xs text-slate-500">{barber.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-slate-700 dark:text-slate-300">
                      {barber.citas}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${barber.citas > 0 ? (barber.completadas / barber.citas) * 100 : 0}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-500">{barber.citas > 0 ? Math.round((barber.completadas / barber.citas) * 100) : 0}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        {barber.rating}
                      </div>
                    </td>
                    <td className="py-4 text-right pr-2 font-black text-slate-900 dark:text-white">
                      ${barber.ingresos.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
