import "../../index.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('remember_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

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
      
      if (rememberMe) {
        localStorage.setItem('remember_email', email);
      } else {
        localStorage.removeItem('remember_email');
      }
      
      const username = data.data?.user?.username || data.data?.user?.nombres || "Usuario";
      localStorage.setItem('username', username);

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

  const handleForgotPassword = () => {
    if (!email) {
      alert("Por favor escribe tu usuario en el campo superior para enviarte el enlace de recuperación.");
      return;
    }
    alert(`Se ha enviado un enlace de recuperación a: ${email}\nPor favor revisa tu correo electrónico.`);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 md:px-10 transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* Header Optimizado */}
      <header className="flex justify-between items-center py-4 sm:py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-primary/30 text-lg shrink-0">
            B
          </div>
          <h1 className="text-sm sm:text-lg font-black tracking-tighter uppercase leading-tight">
            Barber<span className="text-primary">Tech</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-yellow-400 shadow-sm"
          >
            {darkMode ? <Sun size={18} fill="currentColor" /> : <Moon size={18} fill="currentColor" />}
          </button>
          <Link 
            to="/" 
            className="flex items-center gap-1 bg-primary hover:bg-[#7112b3] px-4 py-2 rounded-full text-white font-bold text-[10px] sm:text-xs shadow-md shadow-primary/30 transition-all"
          >
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Volver</span>
          </Link>
        </div>
      </header>

      {/* Main Content con Glassmorphism */}
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
            <span className="text-primary text-[10px] font-black tracking-[2px] uppercase mb-3 block">
              Bienvenido de nuevo
            </span>

            <h2 className="text-4xl sm:text-5xl font-black leading-none mb-4 tracking-tight">
              Barber <span className="text-primary">Tech</span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
              Gestiona tus citas de forma rápida.
            </p>

            <div className="space-y-5 text-left">
              <div>
                <label className="text-xs font-bold mb-2 block ml-1 opacity-70">Usuario</label>
                <input
                  type="text"
                  placeholder="Tu nombre de usuario"
                  className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold mb-2 block ml-1 opacity-70">Contraseña</label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full p-4 pr-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mt-2 px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className="w-4 h-4 rounded-md border-2 border-slate-300 dark:border-slate-600 peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">Recordarme</span>
                </label>

                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-primary hover:underline transition-colors focus:outline-none"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#7112b3] text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 cursor-pointer uppercase tracking-widest text-sm"
              >
                Ingresar
              </button>

              <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                ¿No tienes cuenta? <Link to="/register" className="text-primary font-bold hover:underline">Registrarse gratis</Link>
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