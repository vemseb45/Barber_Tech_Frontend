// 1. IMPORTACIONES: Traemos las herramientas externas necesarias
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function DashboardBarbero() {
  // 2. HOOKS: Inicializamos las funciones de React Router
  const navigate = useNavigate(); 

  // 3. LÓGICA DE NEGOCIO: Función para cerrar la sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/"); 
  };

  // 4. RENDERIZADO: Lo que el usuario verá físicamente en pantalla
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
      
      {/* 5. INTERFAZ DE SALIDA: Botón de cerrar sesión posicionado arriba a la derecha */}
      <button 
        onClick={handleLogout}
        className="login-btn-neon" /* <-- CAMBIO: btn-neon a login-btn-neon */
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
        🚪 Cerrar Sesión
      </button>

      {/* 6. ENCABEZADO: Título principal del Dashboard */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', textShadow: '0 0 15px #00d2ff', marginBottom: '10px' }}>
          Panel de Barbero
        </h1>
        <p style={{ opacity: 0.8 }}>Gestión de citas y servicios diarios</p>
      </header>

      {/* 7. CONTENEDOR DE TARJETAS: Grid responsivo para mostrar la información del día */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px', 
        width: '100%', 
        maxWidth: '1000px' 
      }}>
        
        {/* Tarjeta de Citas */}
        <div style={cardStyle}>
      <h3>Citas para Hoy</h3>
      <p style={numberStyle}>0</p>
      
      {/* 🚀 Agregamos el onClick aquí */}
      <button 
        className="login-btn-neon" 
        style={{ fontSize: '0.7rem', width: '100%' }}
        onClick={() => navigate("/AgendaBarbero")} 
      >
        Ver Agenda
      </button>
    </div>

        {/* Tarjeta de Estadísticas */}
        <div style={cardStyle}>
          <h3>Servicios Realizados</h3>
          <p style={numberStyle}>0</p>
          <button className="login-btn-neon" style={{ fontSize: '0.7rem', width: '100%' }}>Historial</button>
        </div>


        {/* Tarjeta de Estado del Perfil */}
        <div style={cardStyle}>
          <h3>Mi Perfil</h3>
          <p style={{ margin: '15px 0', fontSize: '1.1rem' }}>Estado: <span style={{ color: '#00ff00' }}>Disponible</span></p>
          <button className="login-btn-neon" style={{ fontSize: '0.7rem', width: '100%' }}>Editar Perfil</button>
        </div>

      </div>
    </div>
  );
}

// 8. OBJETOS DE ESTILO: Definiciones de diseño reutilizables para las tarjetas
const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  padding: '25px',
  borderRadius: '15px',
  border: '1px solid rgba(0, 210, 255, 0.3)',
  backdropFilter: 'blur(10px)',                
  textAlign: 'center'
};

const numberStyle: React.CSSProperties = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#00d2ff',                              
  margin: '10px 0'
};