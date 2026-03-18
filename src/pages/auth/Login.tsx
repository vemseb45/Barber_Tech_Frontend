/* --- src/pages/auth/Login.tsx --- */
import "../../index.css"; // Se suben dos niveles para encontrar el CSS en la raíz
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Componente de inicio de sesión con soporte para redirección basada en roles.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

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

      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      
      const rawRole = data.data?.user?.rol || data.data?.rol || "";
      const userRole = rawRole.toString().toLowerCase().trim();

      // REDIRECCIÓN CORREGIDA SEGÚN TU APP.TSX
      if (userRole === "admin") {
        navigate("/dashboardAdmin");
      } else if (userRole === "barbero") {
        navigate("/dashboardBarbero");
      } else {
        navigate("/dashboardCliente");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className={`login-page-mono animate-fade-in`} style={styles.pageContainer}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <span style={styles.logoIcon}></span>
          <h1 style={styles.logoText}>BARBER TECH</h1>
        </div>
        <div style={styles.navSimulada}>
          <button onClick={toggleTheme} style={styles.themeBtn}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/" style={styles.backBtn}>
            ← Volver
          </Link>
        </div>
      </header>

      <main style={styles.mainContent}>
        <form className="login-form-mono animate-fade-in" onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.badge}>LA MEJOR EXPERIENCIA EN BARBERÍAS</div>
          <h2 style={styles.mainTitle}>
            Barber <br />
            <span style={styles.purpleText}>Tech</span>
          </h2>
          <p style={styles.description}>Accede a tu cuenta para gestionar tus citas.</p>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Usuario</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                id="email"
                placeholder="Ej: Juan"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Contraseña</label>
            <div style={styles.inputWrapperRelative}>
              <input
                type="password"
                id="password"
                placeholder="**********"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span style={styles.inputIconEye}>👁️</span>
            </div>
          </div>

          <div style={styles.actionButtons}>
            <button type="submit" style={styles.btnIngresar}>Ingresar</button>
            <Link to="/register" style={styles.btnRegistrarse}>Registrarse</Link>
          </div>
        </form>
      </main>
    </div>
  );
}

// Estilos mantenidos igual, asegurando compatibilidad visual
const styles = {
  pageContainer: { minHeight: '100vh', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' as const, padding: '0 40px', transition: 'all 0.5s ease' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoIcon: { fontSize: '1.4rem' },
  logoText: { fontSize: '1.1rem', fontWeight: '800', letterSpacing: '1px' },
  navSimulada: { display: 'flex', alignItems: 'center', gap: '25px' },
  themeBtn: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' },
  backBtn: { padding: '10px 22px', borderRadius: '50px', background: '#7924c7', color: 'white', textDecoration: 'none', fontWeight: 'bold' as const, fontSize: '0.8rem', boxShadow: '0 4px 15px rgba(121, 36, 199, 0.4)' },
  mainContent: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  form: { width: '100%', maxWidth: '420px', textAlign: 'center' as const, padding: '20px', borderRadius: '24px', background: 'rgba(255, 255, 255, 0.01)' },
  badge: { color: '#7924c7', fontSize: '0.7rem', fontWeight: 'bold' as const, letterSpacing: '1px', marginBottom: '10px' },
  mainTitle: { fontSize: '2.8rem', fontWeight: '900' as const, lineHeight: '1', marginBottom: '15px' },
  purpleText: { color: '#7924c7' },
  description: { color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '30px' },
  inputGroup: { marginBottom: '20px', textAlign: 'left' as const },
  label: { fontSize: '0.85rem', fontWeight: '600' as const, marginBottom: '8px', display: 'block' },
  inputWrapper: { border: '1px solid rgba(121, 36, 199, 0.2)', borderRadius: '12px', overflow: 'hidden' },
  inputWrapperRelative: { position: 'relative' as const, border: '1px solid rgba(121, 36, 199, 0.2)', borderRadius: '12px', overflow: 'hidden' },
  input: { width: '100%', padding: '15px', background: 'rgba(255, 255, 255, 0.05)', border: 'none', borderRadius: '12px', color: '#ffffff', outline: 'none' },
  inputIconEye: { position: 'absolute' as const, right: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 },
  actionButtons: { display: 'flex', gap: '15px', marginTop: '20px' },
  btnIngresar: { flex: 2, padding: '15px', borderRadius: '50px', background: '#7924c7', color: 'white', border: 'none', fontWeight: 'bold' as const, cursor: 'pointer', boxShadow: '0 4px 20px rgba(121, 36, 199, 0.3)' },
  btnRegistrarse: { flex: 1, padding: '15px', borderRadius: '50px', border: '1px solid rgba(128,128,128,0.3)', color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};