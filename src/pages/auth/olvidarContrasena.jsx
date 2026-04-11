import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axios";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    await api.post("http://localhost:8000/api/usuarios/reset-password/", {
      token,
      password,
    });

    alert("Contraseña actualizada");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Nueva contraseña</h2>

        <input
          type="password"
          placeholder="Nueva contraseña"
          className="w-full p-3 border rounded-xl mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-black text-white p-3 rounded-xl"
        >
          Cambiar contraseña
        </button>
      </div>
    </div>
  );
}