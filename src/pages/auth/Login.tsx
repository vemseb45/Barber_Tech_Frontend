import "../../index.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Aprovechamos que tienes framer-motion

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Inicializamos basado en la clase del documento para mantener consistencia con la Landing
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/usuarios/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Error al iniciar sesión");
        return;
      }

      if (data.data?.token) localStorage.setItem('token', data.data.token);

      const rawRole = data.data?.user?.rol || data.data?.rol || "";
      const userRole = rawRole.toString().toLowerCase().trim();

      if (userRole === "admin") navigate("/dashboardAdmin");
      else if (userRole === "barbero") navigate("/dashboardBarbero");
      else navigate("/dashboardCliente");

    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-10 transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans">

      {/* Header */}
      <header className="flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black">B</div>
          <h1 className="text-lg font-extrabold tracking-tighter">BARBER TECH</h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="text-2xl hover:scale-110 transition-transform p-2"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/" className="bg-primary hover:bg-primary-hover px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all">
            ← Volver
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md text-center p-8 rounded-[32px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-2xl"
        >
          <span className="text-primary text-[10px] font-black tracking-[2px] uppercase mb-4 block">
            La mejor experiencia en barberías
          </span>

          <h2 className="text-5xl font-black leading-none mb-4">
            Barber <br />
            <span className="text-primary">Tech</span>
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-sm mb-10">
            Accede a tu cuenta para gestionar tus citas.
          </p>

          <div className="space-y-6 text-left">
            <div>
              <label className="text-xs font-bold mb-2 block ml-1">Usuario</label>
              <input
                type="text"
                placeholder="Ej: Juan"
                className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary outline-none transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="text-xs font-bold mb-2 block ml-1">Contraseña</label>
              <input
                type="password"
                placeholder="**********"
                className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary outline-none transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute right-5 bottom-4 opacity-30 cursor-pointer">👁️</span>
            </div>
          </div>

          <div className="flex gap-4 mt-10 w-full justify-center">
            <button
              type="submit"
              className="flex-1 max-w-[180px] bg-primary hover:bg-[#7112b3] text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 cursor-pointer text-sm"
            >
              Ingresar
            </button>

            <Link
              to="/register"
              className="flex-1 max-w-[180px] flex items-center justify-center border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 py-4 rounded-2xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-center"
            >
              Registrarse
            </Link>
          </div>
        </motion.form>
      </main>

      <footer className="py-8 text-center text-[10px] opacity-40 uppercase tracking-widest">
        © 2026 BarberTech. Todos los derechos reservados.
      </footer>
    </div>
  );
}