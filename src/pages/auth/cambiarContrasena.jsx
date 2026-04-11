import { useState } from "react";
import api from "../../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await api.post("http://localhost:8000/api/usuarios/forgot-password/", { email });
    alert("Correo enviado");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>

        <input
          type="email"
          placeholder="Correo"
          className="w-full p-3 border rounded-xl mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white p-3 rounded-xl"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}