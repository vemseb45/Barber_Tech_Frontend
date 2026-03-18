/* --- src/pages/cliente/DashboardCliente.tsx --- */

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function DashboardCliente() {
  const location = useLocation();

  // 1. RUTAS CORREGIDAS PARA EL MENÚ LATERAL SEGÚN APP.TSX
  const menuItems = [
    { name: "Inicio", icon: "🏠", path: "/dashboardCliente" },
    { name: "Reservas", icon: "📅", path: "/agendaCliente" }, // Ruta exacta de App.tsx
    { name: "Perfil", icon: "👤", path: "/cliente/perfil" },
  ];

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="dashboard-wrapper" style={styles.dashboardContainer}>
      
      {/* SECCIÓN LATERAL */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
          <div style={styles.logoBox}>B</div>
          <h2 style={styles.logoTitle}>BarberTech</h2>
        </div>
        
        <nav style={styles.navigation}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                ...styles.navLink,
                textDecoration: 'none',
                ...(location.pathname === item.path ? styles.navLinkActive : {}),
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={styles.footerSidebar}>
          <div style={styles.userCardMini}>
            <div style={styles.userAvatar}>JP</div>
            <div style={styles.userTextData}>
              <span style={styles.userNameLabel}>Juan Pérez</span>
              <span style={styles.userAccountType}>Cliente Platinum</span>
            </div>
          </div>
          <Link to="/login" style={styles.logoutAction}>
            <span style={{ marginRight: '10px' }}>↪️</span> Cerrar sesión
          </Link>
        </div>
      </aside>

      {/* SECCIÓN PRINCIPAL */}
      <main style={styles.contentArea}>
        <header style={styles.mainHeader}>
          <h1 style={styles.greetingTitle}>Panel de Control Cliente</h1>
          <p style={styles.greetingSub}>Gestiona tus citas y preferencias de estilo.</p>
        </header>

        <div className="animate-fade-in" style={styles.cardsGrid}>
          
          {/* 2. ACCESO CORREGIDO A AGENDA CLIENTE */}
          <Link to="/agendaCliente" style={styles.interactiveLink}>
            <div className="glass-effect card-hover-animation" style={styles.actionCard}>
              <div style={styles.cardTop}>
                <h3 style={styles.cardHeading}>Agendar Cita</h3>
                <span style={styles.iconHighlight}>📅</span>
              </div>
              <p style={styles.cardBrief}>Selecciona tu barbero de preferencia y reserva un espacio en el calendario.</p>
              <div style={styles.cardFooterAction}>Explorar disponibilidad →</div>
            </div>
          </Link>

          {/* 3. ACCESO A PERFIL (Mantenido para futura implementación) */}
          <Link to="/cliente/perfil" style={styles.interactiveLink}>
            <div className="glass-effect card-hover-animation" style={styles.actionCard}>
              <div style={styles.cardTop}>
                <h3 style={styles.cardHeading}>Mi Perfil</h3>
                <span style={styles.iconHighlight}>👤</span>
              </div>
              <p style={styles.cardBrief}>Actualiza tu información personal y preferencias de seguridad.</p>
              <div style={styles.cardFooterAction}>Editar información →</div>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}

// ESTILOS (Sin cambios, manteniendo el diseño radial y dark)
const styles = {
  dashboardContainer: {
    background: 'radial-gradient(circle at 5% 5%, rgba(133, 25, 210, 0.15) 0%, #0a0a0f 50%)',
    backgroundColor: '#0a0a0f',
    minHeight: '100vh',
    display: 'flex',
    padding: '24px',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#ffffff',
  },
  sidebar: {
    width: '280px',
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '28px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column' as const,
    marginRight: '24px',
  },
  logoSection: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '48px' },
  logoBox: {
    width: '42px', height: '42px', borderRadius: '12px',
    background: '#8519d2', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '800' as const, fontSize: '1.4rem', boxShadow: '0 0 20px rgba(133, 25, 210, 0.4)'
  },
  logoTitle: { fontSize: '1.25rem', fontWeight: '700' as const, letterSpacing: '-0.5px' },
  navigation: { display: 'flex', flexDirection: 'column' as const, gap: '12px', flex: 1 },
  navLink: {
    display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 22px',
    borderRadius: '16px', color: '#a1a1aa', fontSize: '0.95rem', fontWeight: '500' as const,
  },
  navLinkActive: {
    background: 'rgba(133, 25, 210, 0.12)',
    color: '#ffffff',
    border: '1px solid rgba(133, 25, 210, 0.2)',
  },
  navIcon: { fontSize: '1.2rem' },
  footerSidebar: { borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' },
  userCardMini: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
  userAvatar: {
    width: '44px', height: '44px', borderRadius: '50%', background: '#8519d2',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' as const
  },
  userTextData: { display: 'flex', flexDirection: 'column' as const },
  userNameLabel: { fontSize: '0.9rem', fontWeight: '600' as const },
  userAccountType: { fontSize: '0.75rem', color: '#71717a' },
  logoutAction: { color: '#f87171', fontSize: '0.85rem', fontWeight: '600' as const, display: 'flex', alignItems: 'center', textDecoration: 'none' },
  contentArea: { flex: 1, display: 'flex', flexDirection: 'column' as const, gap: '32px' },
  mainHeader: { marginTop: '8px' },
  greetingTitle: { fontSize: '2.2rem', fontWeight: '800' as const, marginBottom: '8px' },
  greetingSub: { color: '#a1a1aa', fontSize: '1rem' },
  cardsGrid: { display: 'flex', flexDirection: 'column' as const, gap: '20px', maxWidth: '720px' },
  interactiveLink: { textDecoration: 'none' },
  actionCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '24px',
    padding: '32px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.4s ease',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  cardHeading: { fontSize: '1.3rem', fontWeight: '700' as const, color: '#ffffff' },
  iconHighlight: {
    fontSize: '1.6rem', color: '#8519d2',
    textShadow: '0 0 15px rgba(133, 25, 210, 0.5)'
  },
  cardBrief: { color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' },
  cardFooterAction: { textAlign: 'right' as const, color: '#8519d2', fontWeight: '700' as const, fontSize: '0.9rem' }
};