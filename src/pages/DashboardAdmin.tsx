import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../index.css";

// --- INTERFACES ---
interface Usuario {
  id: number;
  username: string;
  rol: string;
}

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [verGestion, setVerGestion] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (verGestion) {
      const cargarUsuarios = async () => {
        setCargando(true);
        try {
          const res = await api.get('usuarios/');
          const data = res.data.data || res.data;
          setUsuarios(Array.isArray(data) ? data : []);
        } catch (err: any) {
          if (err.response?.status === 401) navigate("/");
        } finally {
          setCargando(false);
        }
      };
      cargarUsuarios();
    }
  }, [verGestion, navigate]);

  const handleCambiarRol = async (id: number, nuevoRol: string) => {
    try {
      await api.patch(`usuarios/${id}/cambiar_rol/`, { rol: nuevoRol });
      setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u)));
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="login-page">
      <button onClick={() => { localStorage.removeItem('token'); navigate("/"); }} style={styles.logoutBtn}>
        🔒 Salir
      </button>

      <div style={styles.layout.wrapper}>
        <header style={styles.layout.header}>
          <h1 style={styles.typography.mainTitle}>
            {verGestion ? "Gestión de Personal" : "Panel de Control Maestro"}
          </h1>
          <p style={styles.typography.subtitle}>Administración global de Barber Tech</p>
        </header>

        {!verGestion ? (
          <div style={styles.layout.grid}>

            {/* Tarjeta Gestión */}
            <div className="login-container" style={styles.components.card}>
              <h3 style={styles.typography.cardTitle}>Gestión de Usuarios</h3>
              <p style={styles.typography.cardText}>Cambia roles de forma instantánea.</p>
              <button onClick={() => setVerGestion(true)} className="login-btn-neon" style={styles.components.btnPill}>
                Gestionar Usuarios
              </button>
            </div>

            {/* Tarjeta Reportes */}
            <div className="login-container" style={styles.components.card}>
              <h3 style={styles.typography.cardTitle}>Reportes de Ventas</h3>
              <p style={styles.typography.cardText}>Estadísticas y flujo de caja.</p>
              <button className="login-btn-neon" style={{ ...styles.components.btnPill, opacity: 0.5 }}>
                Próximamente
              </button>
            </div>
          </div>
        ) : (
          
          <div className="login-container" style={styles.layout.tableWrapper}>
            <button onClick={() => setVerGestion(false)} className="volver-btn" style={styles.components.backBtn}>
              ← Volver
            </button>
            <table style={styles.table.main}>
              <thead>
                <tr style={styles.table.headerRow}>
                  <th style={styles.table.th}>Usuario</th>
                  <th style={styles.table.th}>Rol Actual</th>
                  <th style={styles.table.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} style={styles.table.row}>
                    <td style={styles.table.td}>{u.username}</td>
                    <td style={styles.table.td}>
                      <span style={{ ...styles.components.badge, backgroundColor: u.rol === 'Admin' ? '#8519d2' : '#007bff' }}>
                        {u.rol}
                      </span>
                    </td>
                    <td style={styles.table.actions}>
                      <button onClick={() => handleCambiarRol(u.id, 'Barbero')} className="login-btn-neon" style={styles.components.miniBtn}>Barbero</button>
                      <button onClick={() => handleCambiarRol(u.id, 'Admin')} className="login-btn-neon" style={{ ...styles.components.miniBtn, backgroundColor: '#8519d2' }}>Admin</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// --- ESTILOS POR CATEGORÍAS ---
const styles = {
  // 1. ESTRUCTURA Y CONTENEDORES (Layout)
  layout: {
    wrapper: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '40px' },
    header: { textAlign: 'center' as const, marginBottom: '50px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', width: '100%', maxWidth: '1000px' },
    tableWrapper: { width: '100%', maxWidth: '950px', padding: '30px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(0,210,255,0.3)' },
  },

  // 2. TEXTOS Y FUENTES (Typography)
  typography: {
    mainTitle: { fontSize: '2.8rem', color: 'white', textShadow: '0 0 15px #00d2ff' },
    subtitle: { color: '#00d2ff', letterSpacing: '2px', fontSize: '0.8rem', opacity: 0.8 },
    cardTitle: { fontSize: '1.5rem', color: 'white', marginBottom: '15px' },
    cardText: { color: '#ccc', textAlign: 'center' as const, fontSize: '0.9rem' },
  },

  // 3. ELEMENTOS INTERACTIVOS (Components)
  components: {
    card: { padding: '40px', border: '1px solid rgba(0,210,255,0.3)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' },
    btnPill: { borderRadius: '50px', width: '100%', padding: '12px', fontWeight: 'bold' },
    miniBtn: { fontSize: '0.7rem', padding: '6px 12px', width: 'auto' },
    backBtn: { marginBottom: '20px' },
    badge: { color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem' },
  },

  // 4. DISEÑO DE TABLA (Table)
  table: {
    main: { width: '100%', borderCollapse: 'collapse' as const },
    headerRow: { borderBottom: '2px solid #00d2ff' },
    row: { borderBottom: '1px solid rgba(255,255,255,0.1)' },
    th: { padding: '15px', color: '#00d2ff' },
    td: { padding: '15px', textAlign: 'center' as const, color: 'white' },
    actions: { display: 'flex', gap: '10px', justifyContent: 'center', padding: '15px' },
  },

  // 5. BOTONES ESPECIALES
  logoutBtn: { position: 'absolute' as const, top: '20px', right: '20px', background: '#ff4b2b', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 15px' },
};