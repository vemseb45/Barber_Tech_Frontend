import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="menu">

        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img
              src="/Imagenes/logo2.PNG"
              alt="Logo"
              className="logo5"
            />
          </Link>
        </div>

        {/* Menú principal */}
        <ul className="menu1">
          <li>
            <a href="/#barberia" className="link">Inicio</a>
          </li>
          <li>
            <a href="/#barberias" className="link">Barberías</a>
          </li>
          <li>
            <a href="/#recomendaciones" className="link">Recomendaciones</a>
          </li>
          <li>
            <a href="/#contacto" className="link">Contacto</a>
          </li>
        </ul>

        {/* Usuario */}
        <div className="usuario">
          <input type="checkbox" id="toggle-menu" />

          <label
            htmlFor="toggle-menu"
            className="usuario-btn"
            aria-label="Menú de usuario"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>

          <div className="menu-usuario">
            <div className="btn-usuario">
              <Link to="/login">Iniciar Sesión</Link>
            </div>
            <div className="btn-usuario">
              <Link to="/register">Registrarse</Link>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
}