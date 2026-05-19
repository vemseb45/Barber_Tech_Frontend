/* src/pages/errors/NotFound.tsx */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col px-4 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      
      {/* --- CABECERA --- */}
      <header className="flex justify-between items-center py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#9333ea] text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-[#9333ea]/30 text-lg">
            B
          </div>
          <h1 className="text-lg font-black tracking-tighter uppercase">
            Barber<span className="text-[#9333ea]">Tech</span>
          </h1>
        </div>
      </header>

      {/* --- CONTENIDO --- */}
      <main className="flex-grow flex justify-center items-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-10 rounded-[40px] shadow-2xl backdrop-blur-md">
            
            <div className="flex justify-center mb-6">
              <img 
                src="/Imagenes/Imagen de error.png" 
                alt="Error 404" 
                className="w-900 h-50 object-contain" 
              />
            </div>

            <h1 className="text-8xl font-black mb-2 tracking-tight text-[#9333ea]">
              404
            </h1>
            
            <h2 className="text-2xl font-black mb-4 tracking-tight text-slate-900 dark:text-white uppercase">
              :(
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium px-4">
              la URL a la que estas intentando acceder no existe.
            </p>

            <div className="flex justify-center">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-[#9333ea] hover:bg-[#7112b3] px-6 py-4 rounded-2xl text-white font-black text-xs shadow-xl shadow-[#9333ea]/40 transition-all active:scale-95 uppercase tracking-widest"
              >
                <ArrowLeft size={14} /> <span>Volver al Inicio</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-[9px] opacity-40 uppercase tracking-[4px] font-black">
        © 2026 BarberTech · Estilo con Precisión
      </footer>
    </div>
  );
}