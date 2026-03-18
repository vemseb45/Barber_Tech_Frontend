/* --- src/pages/Register.tsx --- */

import "../../index.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    nombres: "",
    apellidos: "",
    cedula: "",
    telefono: "",
    email: "",
    password: ""
  });
  
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate(); 

  // Sincronización de tema (Igual que el Login)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  // TU LÓGICA ORIGINAL DE VALIDACIÓN
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "nombres" || name === "apellidos") {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return;
    }

    if (name === "cedula" || name === "telefono") {
      if (!/^[0-9]*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // TU LÓGICA ORIGINAL DE ENVÍO A DJANGO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

    if (!emailRegex.test(formData.email)) {
      alert("El correo debe tener formato ejemplo@gmail.com");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/usuarios/registro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
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

  return (
    <div className="login-page-mono animate-fade-in" style={styles.pageContainer}>
      
      {/* HEADER MODERNO */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <span style={styles.logoIcon}>✂️</span>
          <h1 style={styles.logoText}>BARBER TECH</h1>
        </div>
        <div style={styles.navSimulada}>
          <button onClick={toggleTheme} style={styles.themeBtn}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/login" className="btn-primary-hover" style={styles.backBtn}>
            ← Volver
          </Link>
        </div>
      </header>

      <main style={styles.mainContent}>
        <form className="login-form-mono animate-fade-in" onSubmit={handleSubmit} style={styles.form}>
          
          <div style={styles.badge}>ÚNETE A LA EXPERIENCIA</div>
          <h2 style={styles.mainTitle}>
            Crea tu <span style={styles.purpleText}>Cuenta</span>
          </h2>
          <p style={styles.description}>Completa tus datos para empezar.</p>

          {/* GRID DE INPUTS (2 COLUMNAS) */}
          <div style={styles.inputsGrid}>
            
            {/* Username */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <div className="input-container-themed" style={styles.inputWrapper}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Ej: Pipe01" style={styles.input} required />
              </div>
            </div>

            {/* Correo */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo</label>
              <div className="input-container-themed" style={styles.inputWrapper}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@gmail.com" style={styles.input} required />
              </div>
            </div>

            {/* Nombres */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombres</label>
              <div className="input-container-themed" style={styles.inputWrapper}>
                <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Tus nombres" style={styles.input} required />
              </div>
            </div>

            {/* Apellidos */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Apellidos</label>
              <div className="input-container-themed" style={styles.inputWrapper}>
                <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Tus apellidos" style={styles.input} required />
              </div>
            </div>

            {/* Cédula */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Cédula</label>
              <div className="input-container-themed" style={styles.inputWrapper}>
                <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} maxLength={10} placeholder="12345678" style={styles.input} required />
              </div>
            </div>

            {/* Teléfono */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Teléfono</label>
              <div className="input-container-themed" style={styles.inputWrapper}>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} maxLength={10} placeholder="300..." style={styles.input} required />
              </div>
            </div>

            {/* Contraseña (Ocupa las 2 columnas para que no se vea apretado) */}
            <div style={{...styles.inputGroup, gridColumn: 'span 2'}}>
              <label style={styles.label}>Contraseña</label>
              <div className="input-container-themed" style={styles.inputWrapper}>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" style={styles.input} required />
              </div>
            </div>

          </div>

          <div style={styles.actionButtons}>
            <button type="submit" className="btn-primary-hover" style={styles.btnRegistrarse}>
              Registrarse
            </button>
            <p style={styles.extraText}>
              ¿Ya tienes cuenta? <Link to="/login" style={styles.link}>Inicia Sesión</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '0 40px',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoIcon: { fontSize: '1.4rem' },
  logoText: { fontSize: '1.1rem', fontWeight: '800', letterSpacing: '1px' },
  navSimulada: { display: 'flex', alignItems: 'center', gap: '25px' },
  themeBtn: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'inherit' },
  backBtn: { padding: '10px 22px', borderRadius: '50px', background: '#7924c7', color: 'white', textDecoration: 'none', fontWeight: 'bold' as const, fontSize: '0.8rem' },
  mainContent: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' },
  form: { width: '100%', maxWidth: '550px', textAlign: 'center' as const },
  badge: { color: '#7924c7', fontSize: '0.7rem', fontWeight: 'bold' as const, letterSpacing: '1px', marginBottom: '10px' },
  mainTitle: { fontSize: '2.5rem', fontWeight: '900' as const, lineHeight: '1', marginBottom: '10px' },
  purpleText: { color: '#7924c7' },
  description: { color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px' },
  inputsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' },
  inputGroup: { textAlign: 'left' as const },
  label: { fontSize: '0.8rem', fontWeight: '600' as const, marginBottom: '5px', display: 'block' },
  inputWrapper: { border: '1px solid rgba(121, 36, 199, 0.2)', borderRadius: '12px', overflow: 'hidden' },
  input: { width: '100%', padding: '12px', background: 'var(--input-bg-custom)', border: 'none', color: 'var(--text-main)', outline: 'none' },
  actionButtons: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '10px' },
  btnRegistrarse: { width: '100%', maxWidth: '250px', padding: '15px', borderRadius: '50px', background: '#7924c7', color: 'white', border: 'none', fontWeight: 'bold' as const, cursor: 'pointer' },
  extraText: { fontSize: '0.85rem', color: 'var(--text-muted)' },
  link: { color: '#7924c7', textDecoration: 'none', fontWeight: 'bold' as const }
};