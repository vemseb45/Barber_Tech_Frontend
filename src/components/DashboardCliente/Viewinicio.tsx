import { 
  CalendarDays, 
  TrendingUp, 
  Gift, 
  MapPin, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ViewInicioProps {
  onViewChange: (view: any) => void;
}

export default function ViewInicioCliente({ onViewChange }: ViewInicioProps) {
  const username = localStorage.getItem('username') || 'Cliente';

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* HEADER CLIENTE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
            ¡Qué bueno verte, {username}!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Tienes <span className="text-primary font-bold">450 puntos</span> acumulados. ¡Casi llegas al premio!
          </p>
        </div>
        <button
          onClick={() => onViewChange('Reservar Cita')} // ✅ FIX AQUÍ
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/25"
        >
          <CalendarDays size={18} />
          Reservar Nueva Cita
        </button>
      </div>

      {/* ESTADÍSTICAS / STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Puntos Lealtad', val: '450', inc: 'Nivel Gold', icon: Gift, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Citas Realizadas', val: '12', inc: '+1 este mes', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Beneficios', val: '2', inc: 'Cupones hoy', icon: Sparkles, color: 'text-primary', bg: 'bg-primary/10' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
              <span className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon size={20} />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold dark:text-white">{item.val}</h3>
              <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                {item.inc}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MI PRÓXIMA CITA */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Tu Próxima Cita</h3>
          </div>

          <div className="bg-white dark:bg-[#1e293b] rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm p-8 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="flex flex-col items-center justify-center px-8 py-4 bg-primary/5 dark:bg-primary/10 rounded-[20px] border border-primary/20">
                <span className="text-4xl font-black text-primary">18</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Marzo</span>
              </div>
              
              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="text-xl font-bold dark:text-white">Corte Degradado + Barba</h4>
                  <p className="text-slate-500 text-sm font-medium">
                    Con el Master Barber: <span className="text-primary">Carlos B.</span>
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                    <Clock size={16} className="text-primary" /> 15:30 PM
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                    <MapPin size={16} className="text-primary" /> Sede Central - Calle 10
                  </div>
                </div>
              </div>

              <button className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100">
                Cancelar
              </button>
            </div>
            
            <CalendarDays size={120} className="absolute -right-8 -bottom-8 text-slate-50 dark:text-slate-800/20 rotate-12" />
          </div>
        </div>

        {/* PROGRESO DE PREMIO */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Tu Recompensa</h3>
          <div className="bg-white dark:bg-[#1e293b] rounded-[24px] border border-slate-200 dark:border-slate-700/50 p-8 shadow-sm text-center">
            <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-500/20 animate-bounce">
              <Gift size={32} />
            </div>
            <h4 className="text-sm font-bold dark:text-white uppercase tracking-widest mb-1">Corte Gratis</h4>
            <p className="text-xs text-slate-500 mb-6 font-medium">Estás a 50 puntos de tu beneficio.</p>
            
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-amber-500 h-full transition-all duration-1000" style={{ width: '90%' }}></div>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline group">
              Ver Catálogo de Premios 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}