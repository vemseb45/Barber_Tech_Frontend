/* --- src/pages/Register.tsx --- */
import "../../index.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Eye, EyeOff, ArrowLeft } from "lucide-react";

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
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nombres" || name === "apellidos") {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return;
    }
    if (name === "cedula" || name === "telefono") {
      if (!/^[0-9]*$/.test(value)) return;
    }
    setFormData({ ...formData, [name]: value });
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

  const inputClass = "w-full p-3.5 sm:p-4 rounded-2xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium";

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 md:px-10 transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans antialiased overflow-x-hidden">

      {/* Header */}
      <header className="flex justify-between items-center py-4 sm:py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-primary/30 text-lg shrink-0">
            B
          </div>
          <h1 className="text-sm sm:text-lg font-black tracking-tighter uppercase leading-none">
            Barber<span className="text-primary">Tech</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-yellow-400 cursor-pointer shadow-sm transition-transform active:scale-95"
            aria-label="Cambiar tema"
          >
            {darkMode ? <Sun size={18} fill="currentColor" /> : <Moon size={18} fill="currentColor" />}
          </button>
          <Link
            to="/login"
            className="flex items-center gap-1.5 bg-primary hover:bg-[#7112b3] px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-white font-bold text-[10px] sm:text-xs shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5"
          >
            <ArrowLeft size={14} /> <span className="hidden xs:inline">Volver</span>
          </Link>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow flex justify-center items-center py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 sm:p-10 md:p-12 rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-black/5 text-center backdrop-blur-sm"
          >
            <div className="mb-8">
              <span className="text-primary text-[10px] font-black tracking-[3px] uppercase block mb-2">
                Únete a la experiencia
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-2 tracking-tight">
                Crea tu <span className="text-primary">Cuenta</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                Completa tus datos para empezar tu transformación.
              </p>
            </div>

            {/* Grid de Inputs Adaptable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
              {[
                { label: "Usuario", name: "username", type: "text", placeholder: "Ej: Pepito01" },
                { label: "Correo", name: "email", type: "email", placeholder: "ejemplo@gmail.com" },
                { label: "Nombres", name: "nombres", type: "text", placeholder: "Tus nombres" },
                { label: "Apellidos", name: "apellidos", type: "text", placeholder: "Tus apellidos" },
                { label: "Cédula", name: "cedula", type: "text", placeholder: "12345678", max: 10 },
                { label: "Teléfono", name: "telefono", type: "text", placeholder: "300...", max: 10 },
              ].map((field) => (
                <div key={field.name} className="text-left">
                  <label className="text-xs font-bold mb-1.5 block ml-1 text-slate-600 dark:text-slate-400 opacity-80">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    maxLength={field.max}
                    placeholder={field.placeholder}
                    className={inputClass}
                    required
                  />
                </div>
              ))}

              {/* Password Fields */}
              <div className="text-left relative">
                <label className="text-xs font-bold mb-1.5 block ml-1 text-slate-600 dark:text-slate-400 opacity-80">Contraseña</label>
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="text-left relative">
                <label className="text-xs font-bold mb-1.5 block ml-1 text-slate-600 dark:text-slate-400 opacity-80">Confirmar Contraseña</label>
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5">
              <button
                type="submit"
                className="w-full max-w-xs bg-primary hover:bg-[#7112b3] text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 cursor-pointer uppercase tracking-widest text-sm"
              >
                Registrarse ahora
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-bold hover:underline">Inicia Sesión</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-[10px] opacity-40 uppercase tracking-[2px] font-bold">
        © 2026 BarberTech. Estilo con precisión.
      </footer>
    </div>
  );
}