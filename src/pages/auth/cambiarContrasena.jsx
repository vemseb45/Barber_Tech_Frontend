import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import api from "../../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      await api.post("http://localhost:8000/api/usuarios/forgot-password/", { email });
      alert("Correo enviado con éxito. Revisa tu bandeja de entrada.");
    } catch (error) {
      alert("Error al enviar el correo. Verifica que el usuario exista.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 md:px-10 transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-center py-4 sm:py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#9333ea] text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-[#9333ea]/30 text-lg shrink-0">
            B
          </div>
          <h1 className="text-sm sm:text-lg font-black tracking-tighter uppercase leading-tight">
            Barber<span className="text-[#9333ea]">Tech</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/login"
            className="flex items-center gap-1 bg-[#9333ea] hover:bg-[#7112b3] px-4 py-2 rounded-full text-white font-bold text-[10px] sm:text-xs shadow-md shadow-[#9333ea]/30 transition-all"
          >
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Volver</span>
          </Link>
        </div>
      </header>

      {/* Main Content con Glassmorphism y Motion */}
      <main className="flex-grow flex justify-center items-center py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full text-center p-6 sm:p-10 rounded-[32px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-2xl backdrop-blur-sm"
          >
            <span className="text-[#9333ea] text-[10px] font-black tracking-[2px] uppercase mb-3 block text-center">
              Seguridad de cuenta
            </span>

            <h2 className="text-4xl sm:text-5xl font-black leading-none mb-4 tracking-tight text-center">
              Barber <span className="text-[#9333ea]">Tech</span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 text-center px-2">
              Ingresa tu correo para recuperar el acceso.
            </p>

            <div className="space-y-5 text-left">
              <div>
                <label className="text-xs font-bold mb-2 block ml-1 opacity-70">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-[#9333ea] focus:ring-2 focus:ring-[#9333ea]/20 outline-none transition-all text-sm font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-[#9333ea] hover:bg-[#7112b3] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#9333ea]/30 transition-all active:scale-95 cursor-pointer uppercase tracking-widest text-sm"
              >
                Enviar Instrucciones
              </button>

              <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                ¿Recordaste tu contraseña? <Link to="/login" className="text-[#9333ea] font-bold hover:underline">Inicia sesión</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-[10px] opacity-40 uppercase tracking-widest font-bold">
        © 2026 BarberTech. Estilo y precisión.
      </footer>
    </div>
  );
}