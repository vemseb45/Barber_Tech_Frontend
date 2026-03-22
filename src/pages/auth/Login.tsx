import "../../index.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Aprovechamos que tienes framer-motion
import { Sun, Moon, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex flex-col px-6 md:px-10 transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans antialiased">
      
      {/* Header */}
      <header className="flex justify-between items-center py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-primary/30 text-lg">
            B
          </div>
          <h1 className="text-lg font-black tracking-tighter uppercase">
            Barber <span className="text-primary">Tech</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-yellow-400 cursor-pointer shadow-sm"
            title="Alternar modo visual"
            aria-label="Cambiar tema"
          >
            {darkMode ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
          </button>
          <Link 
            to="/" 
            className="bg-primary hover:bg-[#7112b3] border border-transparent hover:border-[#7112b3] px-6 py-2 rounded-full text-white font-bold text-xs shadow-md shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0.5em_0_#7112b3]"
          >
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  className="w-full p-4 pr-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary outline-none transition-all text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-10 w-full justify-center">
            <button
              type="submit"
              className="w-full max-w-xs bg-primary hover:bg-[#7112b3] text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 cursor-pointer"
            >
              Ingresar
            </button>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              ¿No tienes cuenta? <Link to="/register" className="text-primary font-bold hover:underline">Registrarse</Link>
            </p>
          </div>
        </motion.form>
      </main>

      <footer className="py-8 text-center text-[10px] opacity-40 uppercase tracking-widest">
        © 2026 BarberTech. Todos los derechos reservados.
      </footer>
    </div>
  );
}