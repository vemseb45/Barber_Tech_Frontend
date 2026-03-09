import "./css/Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    telefono: "",
    email: "",
    password: ""
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

    if (!emailRegex.test(formData.email)) {
      alert("El correo debe tener formato ejemplo@dominio.com");
      return;
    }

    console.log("Datos enviados:", formData);
  };

  return (
    <div className="containerr">
      <div className="form-wrapper">
        <h1 className="title">Registro</h1>

        <form className="form" onSubmit={handleSubmit}>

          <label htmlFor="nombres">Nombres</label>
          <input type="text" name="nombres" placeholder="Nombre(s)" value={formData.nombres} onChange={handleChange} required />

          <label htmlFor="apellidos">Apellidos</label>
          <input type="text" name="apellidos" placeholder="Apellido(s)" value={formData.apellidos} onChange={handleChange} required />

          <label htmlFor="cedula">Cédula</label>
          <input type="text" name="cedula" placeholder="# Cédula" value={formData.cedula} onChange={handleChange} maxLength={10} required />

          <label htmlFor="telefono">Teléfono</label>
          <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} maxLength={10} required />

          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@gmail.com" required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" placeholder="********" value={formData.password}  onChange={handleChange}  required />

          <button type="submit">Registrarse</button>

          <p className="extra">
            ¿Ya tiene cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}