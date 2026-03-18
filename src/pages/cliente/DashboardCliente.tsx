import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  CalendarPlus, 
  User, 
  LogOut, 
  Sparkles, 
  Clock, 
  MapPin, 
  Gift, 
  ChevronRight 
} from "lucide-react";

// 1. IMPORTA TU COMPONENTE DESDE EL ARCHIVO EXTERNO
import ViewAgenda from "../../components/DashboardCliente/Viewagenda"; // <-- Ajusta la ruta si está en otra carpeta
// --- SUB-COMPONENTE: INICIO (Mantenlo aquí o muévelo a otro archivo) ---
const ViewInicio = ({ onReservaClick }: { onReservaClick: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }}
    className="space-y-8"
  >
    {/* BANNER DINÁMICO */}
    <div className="relative overflow-hidden bg-primary rounded-[40px] p-10 text-white shadow-2xl shadow-primary/20">
      <div className="relative z-10 max-w-lg">
        <h2 className="text-4xl font-black leading-tight">¿Listo para tu próximo gran cambio?</h2>
        <p className="mt-4 text-white/80 font-medium">Reserva hoy y mantén tu estilo impecable con nuestros barberos expertos.</p>
        <button 
          onClick={onReservaClick}
          className="mt-8 bg-white text-primary px-8 py-4 rounded-[20px] font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
        >
          Reservar Ahora <CalendarPlus size={18} />
        </button>
      </div>
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* PRÓXIMA CITA */}
      <div className="lg:col-span-2 p-8 bg-white dark:bg-white/5 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-sm">
        <h4 className="font-black text-xl mb-6 text-slate-800 dark:text-white">Tu Próxima Cita</h4>
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-white/5 rounded-[28px] border border-dashed border-slate-200 dark:border-white/10">
          <div className="flex flex-col items-center justify-center px-6 border-r border-slate-200 dark:border-white/10">
            <span className="text-4xl font-black text-primary">18</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Marzo</span>
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-200">
              <Clock size={18} className="text-primary" /> 15:30 PM
            </div>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
              <MapPin size={18} className="text-primary" /> Barbería Central - Silla 02
            </div>
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-black">
              Corte Premium + Barba
            </div>
          </div>
        </div>
      </div>

      {/* LEALTAD */}
      <div className="p-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[32px] text-white flex flex-col items-center justify-center text-center shadow-xl shadow-orange-500/20">
        <Gift size={40} className="mb-4" />
        <h4 className="text-4xl font-black">450</h4>
        <p className="font-bold text-xs uppercase tracking-widest mt-2 opacity-90">Puntos Barber</p>
        <div className="mt-6 w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <div className="bg-white h-full w-[75%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
        </div>
        <p className="text-[10px] mt-4 font-black uppercase tracking-tighter">¡Faltan 50 puntos para un corte gratis!</p>
      </div>
    </div>
  </motion.div>
);

// --- COMPONENTE PRINCIPAL ---
export default function DashboardCliente() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'Inicio' | 'Reservas' | 'Perfil'>('Inicio');
  
  // Sincronizar dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const menuItems = [
    { id: 'Inicio', name: "Inicio", icon: LayoutDashboard },
    { id: 'Reservas', name: "Reservas", icon: CalendarPlus },
    { id: 'Perfil', name: "Perfil", icon: User },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-4 mb-12 group">
          <div className="w-12 h-12 bg-primary rounded-[18px] flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:rotate-6 transition-transform">
            <Sparkles size={24} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-black tracking-tighter uppercase italic leading-none dark:text-white">
              Barber<span className="text-primary">Tech</span>
            </h2>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Client Pro</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-[20px] font-bold text-sm transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-x-1' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                  {item.name}
                </div>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </button>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-auto">
          <button 
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all font-black text-xs uppercase tracking-[0.2em] cursor-pointer"
          >
            <LogOut size={16} strokeWidth={3} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-12 overflow-y-auto bg-slate-50 dark:bg-[#0a0a0f]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* RENDERIZADO CONDICIONAL */}
            {activeView === 'Inicio' && (
              <ViewInicio onReservaClick={() => setActiveView('Reservas')} />
            )}
            
            {activeView === 'Reservas' && (
              <ViewAgenda /> 
            )}

            {activeView === 'Perfil' && (
              <div className="flex items-center justify-center h-64 text-slate-400 font-bold italic uppercase border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px]">
                Configuración de Perfil (Próximamente)
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}