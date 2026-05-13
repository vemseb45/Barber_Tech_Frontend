import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, AlertCircle, Mail, Hammer } from "lucide-react";

export default function ForgotPassword() {
  // --- ESTADOS DE CONTROL ---
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // --- LÓGICA DE VALIDACIÓN ---
  
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value) {
      setError("El correo es obligatorio");
    } else if (!emailRegex.test(value)) {
      setError("Formato de correo inválido");
    } else {
      setError("");
    }
  };

  // Añadimos el tipo al evento de cambio
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  // --- MANEJADOR SIMULADO ---
  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (error || !email) return;

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setError("Esta función estará disponible próximamente (Mantenimiento del servidor)");
    }, 1500);
  };

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

        <Link
          to="/login"
          className="flex items-center gap-2 bg-[#9333ea] hover:bg-[#7112b3] px-5 py-2 rounded-full text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <ArrowLeft size={14} /> <span>Volver</span>
        </Link>
      </header>

      {/* --- FORMULARIO --- */}
      <main className="flex-grow flex justify-center items-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-10 rounded-[40px] shadow-2xl text-center backdrop-blur-md"
          >
            <div className="flex justify-center mb-4 text-[#9333ea] opacity-50">
               <Hammer size={32} />
            </div>

            <h2 className="text-4xl font-black mb-3 tracking-tight text-slate-900 dark:text-white">
              Recuperar <span className="text-[#9333ea]">Acceso</span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium px-4">
              Ingresa tu correo para recibir las instrucciones (Módulo en Desarrollo).
            </p>

            <div className="space-y-6 text-left">
              <div>
                <label className="text-[10px] font-black mb-2 block ml-1 uppercase opacity-60">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    className={`w-full p-4 pl-12 rounded-2xl bg-slate-100 dark:bg-white/5 border transition-all outline-none text-sm font-medium ${
                      error 
                        ? "border-red-500 ring-4 ring-red-500/10" 
                        : "border-transparent focus:border-[#9333ea] focus:ring-4 focus:ring-[#9333ea]/10"
                    }`}
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 text-[10px] text-red-500 font-bold mt-2 ml-2 italic"
                    >
                      <AlertCircle size={12} />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={isLoading || !!error || !email}
                className="w-full bg-[#9333ea] hover:bg-[#7112b3] disabled:opacity-40 text-white font-black py-4 rounded-2xl shadow-xl shadow-[#9333ea]/40 transition-all active:scale-95 uppercase tracking-widest text-sm"
              >
                {isLoading ? "Validando..." : "Enviar Instrucciones"}
              </button>

              <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                ¿Ya tienes una clave? <Link to="/login" className="text-[#9333ea] font-black hover:underline underline-offset-4">Inicia sesión</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-[9px] opacity-40 uppercase tracking-[4px] font-black">
        © 2026 BarberTech · Estilo con Precisión
      </footer>
    </div>
  );
}