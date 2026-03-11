import "./css/Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
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
          <input type="password" id="password" name="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} required/>

          <button type="submit">Ingresar</button>

          <p className="extra">
            ¿No tiene cuenta?
            <Link to="/register"> Registrarse </Link>
          </p>

        </form>
      </div>

    </div>
  );
}