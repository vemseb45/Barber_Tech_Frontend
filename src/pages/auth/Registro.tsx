/* --- src/pages/Register.tsx --- */
import "../../index.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    nombres: "",
    apellidos: "",
    cedula: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Inicializamos en true porque el App.tsx fuerza el theme 'dark' por defecto.
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  // Efecto para aplicar el tema al cambiar el estado
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Lógica de validación y cambio de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validar solo letras para nombres/apellidos
    if (name === "nombres" || name === "apellidos") {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return;
    }

    // Validar solo números para cédula/teléfono
    if (name === "cedula" || name === "telefono") {
      if (!/^[0-9]*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(formData.email)) {
      alert("El correo debe tener formato ejemplo@gmail.com");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await fetch("http://localhost:8000/api/usuarios/registro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al registrar usuario");
        return;
      }

      alert("Usuario registrado correctamente");
      navigate("/login");

    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  // Clase común para todos los inputs para evitar repetición y errores de color
  const inputClass = "w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500";

  return (
    <div className="min-h-screen flex flex-col px-6 md:px-10 transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans antialiased">

      {/* Header */}
      <header className="flex justify-between items-center py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-primary/30 text-base sm:text-lg shrink-0">
            B
          </div>
          <h1 className="text-base sm:text-lg font-black tracking-tighter uppercase leading-none mt-1 sm:mt-0">
            Barber<br className="sm:hidden" /> <span className="text-primary">Tech</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-yellow-400 cursor-pointer shadow-sm shrink-0"
            title="Alternar modo visual"
            aria-label="Cambiar tema"
          >
            {darkMode ? <Sun size={18} className="sm:w-5 sm:h-5" fill="currentColor" /> : <Moon size={18} className="sm:w-5 sm:h-5" fill="currentColor" />}
          </button>
          <Link
            to="/login"
            className="bg-primary hover:bg-[#7112b3] border border-transparent hover:border-[#7112b3] px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-white font-bold text-[10px] sm:text-xs shadow-md shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0.5em_0_#7112b3] whitespace-nowrap shrink-0"
          >
            ← Volver
          </Link>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow flex justify-center items-center py-10">
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl shadow-black/5 text-center"
        >
          <div className="mb-10">
            <span className="text-primary text-[10px] font-black tracking-[3px] uppercase block mb-2">
              Únete a la experiencia
            </span>
            <h2 className="text-4xl font-black mb-2">
              Crea tu <span className="text-primary">Cuenta</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Completa tus datos para empezar tu transformación.
            </p>
          </div>

          {/* Grid de Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

            <div className="text-left">
              <label className="text-xs font-bold mb-2 block ml-1 text-slate-700 dark:text-slate-300">Usuario</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Ej: Pepito01" className={inputClass} required />
            </div>

            <div className="text-left">
              <label className="text-xs font-bold mb-2 block ml-1 text-slate-700 dark:text-slate-300">Correo</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@gmail.com" className={inputClass} required />
            </div>

            <div className="text-left">
              <label className="text-xs font-bold mb-2 block ml-1 text-slate-700 dark:text-slate-300">Nombres</label>
              <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Tus nombres" className={inputClass} required />
            </div>

            <div className="text-left">
              <label className="text-xs font-bold mb-2 block ml-1 text-slate-700 dark:text-slate-300">Apellidos</label>
              <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Tus apellidos" className={inputClass} required />
            </div>

            <div className="text-left">
              <label className="text-xs font-bold mb-2 block ml-1 text-slate-700 dark:text-slate-300">Cédula</label>
              <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} maxLength={10} placeholder="12345678" className={inputClass} required />
            </div>

            <div className="text-left">
              <label className="text-xs font-bold mb-2 block ml-1 text-slate-700 dark:text-slate-300">Teléfono</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} maxLength={10} placeholder="300..." className={inputClass} required />
            </div>

            <div className="text-left relative">
              <label className="text-xs font-bold mb-2 block ml-1 text-slate-700 dark:text-slate-300">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className={`${inputClass} pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-left relative">
              <label className="text-xs font-bold mb-2 block ml-1 text-slate-700 dark:text-slate-300">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  className={`${inputClass} pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className="w-full max-w-xs bg-primary hover:bg-[#7112b3] text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 cursor-pointer"
            >
              Registrarse ahora
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-bold hover:underline">Inicia Sesión</Link>
            </p>
          </div>
        </motion.form>
      </main>

      <footer className="py-8 text-center text-[10px] opacity-30 uppercase tracking-[2px]">
        © 2026 BarberTech. Estilo con precisión.
      </footer>
    </div>
  );
}