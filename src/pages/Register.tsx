import "../index.css";
import { useState } from "react";
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
  
  // Opcional: Para redirigir al login después de un registro exitoso
  const navigate = useNavigate(); 

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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al registrar usuario");
        return;
      }

      alert("Usuario registrado correctamente");
      console.log("Respuesta del servidor:", data);
      
      // Te redirige al login una vez se registra con éxito
      navigate("/login"); 

    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="register-page">

      {/* Botón volver */}
      <Link to="/" className="volver-btn">
        ← Volver
      </Link>

      <div className="register-container">
        <h1 className="register-title">Registro</h1>

        <form className="register-form" onSubmit={handleSubmit}>

          <label className="register-label" htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />

          <label className="register-label" htmlFor="nombres">Nombres</label>
          <input type="text" name="nombres" placeholder="Nombre(s)" value={formData.nombres} onChange={handleChange} required />

          <label className="register-label" htmlFor="apellidos">Apellidos</label>
          <input type="text" name="apellidos" placeholder="Apellido(s)" value={formData.apellidos} onChange={handleChange} required />

          <label className="register-label" htmlFor="cedula">Cédula</label>
          <input type="text" name="cedula" placeholder="# Cédula" value={formData.cedula} onChange={handleChange} maxLength={10} required />

          <label className="register-label" htmlFor="telefono">Teléfono</label>
          <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} maxLength={10} required />

          <label className="register-label" htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@gmail.com" required />

          <label className="register-label" htmlFor="password">Contraseña</label>
          <input type="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} required />

          <button type="submit" className="register-btn-neon">
            Registrarse
          </button>

          <p className="register-extra">
            ¿Ya tiene cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>

        </form>
      </div>

    </div>
  );
}