import "./css/Login.css";
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
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al iniciar sesión");
        return;
      }

      alert("Inicio de sesión exitoso");
      console.log("Respuesta del servidor:", data);

      const userRole = data.rol || data.usuario?.rol || data.role || data.usuario?.role || (data.usuario && data.usuario.rol);

      if (userRole === "cliente") {
        navigate("/DashboardCliente");
      } else if (userRole === "barbero") {
        navigate("/DashboardBarbero");
      } else if (userRole === "admin") {
        navigate("/DashboardAdmin");
      } else {
        navigate("/DashboardCliente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-page">

      {/* Botón volver */}
      <Link to="/" className="btn-style1 volver-btn">
        ← Volver
      </Link>

      <div className="containerl">
        <h1 className="title">Iniciar Sesión</h1>

        <form className="form" onSubmit={handleSubmit}>

          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" placeholder="xxxxxxx@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} required />

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