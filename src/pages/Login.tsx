import "../index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/usuarios/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al iniciar sesión");
        return;
      }

      // Guardamos el token
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      
      console.log("Datos crudos del servidor:", data);

      const rawRole = data.data?.user?.rol || data.data?.rol || "";
      const userRole = rawRole.toString().toLowerCase().trim();

      console.log("DEBUG - Rol extraído final:", `"${userRole}"`);

      if (userRole === "admin") {
        console.log("Redirigiendo a Admin...");
        navigate("/DashboardAdmin");

      } else if (userRole === "barbero") {
        navigate("/DashboardBarbero");

      } else if (userRole === "cliente") {
        navigate("/DashboardCliente");
        
      } else {
        console.log("No se reconoció el rol, mandando a Cliente por defecto");
        navigate("/DashboardCliente");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="btn-style1 volver-btn">
        ← Volver
      </Link>

      <div className="containerl">
        <h1 className="title">Iniciar Sesión</h1>

        <form className="form" onSubmit={handleSubmit}>

          <label htmlFor="email">Usuario o Correo</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Ej: Pipe03NG"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-neon">
            Ingresar
          </button>

          <p className="extra">
            ¿No tiene cuenta?
            <Link to="/register"> Registrarse </Link>
          </p>
        </form>
      </div>
    </div>
  );
}