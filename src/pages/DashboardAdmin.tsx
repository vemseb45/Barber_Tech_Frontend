// 1. IMPORTACIONES (La Caja de Herramientas): 
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function DashboardAdmin() {
  
  // 2. HOOKS DE ESTADO Y NAVEGACIÓN (El Motor): 
  const navigate = useNavigate();

  // 3. LÓGICA DE FUNCIONES (El Cerebro): 
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    navigate("/");                    
  };

  // 4. EL CONTENEDOR BASE (El Escenario): 
  return (
    <div className="login-page" style={{ 
      color: 'white', 
      padding: '100px 20px 20px 20px', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative' 
    }}>
      
      {/* 5. INTERFAZ DE SALIDA (La Acción): */}
      <button 
        onClick={handleLogout}
        className="login-btn-neon" /* <-- CORREGIDO AQUÍ */
        style={{ 
          position: 'absolute', 
          top: '30px', 
          right: '30px', 
          backgroundColor: '#ff4b2b', 
          fontSize: '0.8rem',
          padding: '10px 20px',
          width: 'auto',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(255, 75, 43, 0.5)', 
          zIndex: 1000
        }}
      >
        🔒 Salir del Sistema
      </button>

      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', textShadow: '0 0 15px #00d2ff', marginBottom: '10px' }}>
          Panel de Control Maestro
        </h1>
        <p style={{ opacity: 0.8 }}>Administración global de Barber Tech</p>
      </header>

      {/* 6. GRID Y TARJETAS DE GESTIÓN (El Contenido): */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px', 
        width: '100%', 
        maxWidth: '1000px' 
      }}>
        
        <div style={cardStyle}>
          <h3>Gestión de Barberos</h3>
          <p style={descriptionStyle}>Registrar, editar o dar de baja personal.</p>
          <button className="login-btn-neon" style={{ fontSize: '0.7rem', width: '100%' }}>Administrar</button> {/* <-- CORREGIDO AQUÍ */}
        </div>

        <div style={cardStyle}>
          <h3>Base de Datos Clientes</h3>
          <p style={descriptionStyle}>Ver historial y datos de contacto de clientes.</p>
          <button className="login-btn-neon" style={{ fontSize: '0.7rem', width: '100%' }}>Ver Usuarios</button> {/* <-- CORREGIDO AQUÍ */}
        </div>

        <div style={cardStyle}>
          <h3>Reportes y Ganancias</h3>
          <p style={descriptionStyle}>Estadísticas mensuales y flujo de caja.</p>
          <button className="login-btn-neon" style={{ fontSize: '0.7rem', width: '100%' }}>Ver Reportes</button> {/* <-- CORREGIDO AQUÍ */}
        </div>

      </div>
    </div>
  );
}

// 7. ESTILOS CONSTANTES (El Diseño): 
const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',       
  padding: '25px',
  borderRadius: '15px',
  border: '1px solid rgba(0, 210, 255, 0.3)',    
  backdropFilter: 'blur(10px)',                
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#ccc',
  margin: '20px 0',
  lineHeight: '1.4'
};