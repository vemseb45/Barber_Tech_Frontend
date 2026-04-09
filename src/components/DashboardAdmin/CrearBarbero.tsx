import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import api from '../../api/axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // 🔥 para refrescar lista
}

const CrearBarbero: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    cedula: '',
    telefono: '',
    barberia_id: 1,
    especialidad_id: 1
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("barberos/crear-barbero/", form);

      alert("Barbero creado correctamente");

      onSuccess(); // 🔥 recarga lista
      onClose();   // 🔥 cierra modal

      setForm({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        cedula: '',
        telefono: '',
        barberia_id: 1,
        especialidad_id: 1
      });

    } catch (error: any) {
      console.error("ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Error al crear barbero");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="w-full max-w-2xl bg-white dark:bg-[#1e293b] rounded-[32px] p-8 shadow-2xl border border-slate-200 dark:border-slate-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-800 dark:text-white">
            Crear Barbero
          </h3>

          <button onClick={onClose}>
            <X className="text-slate-400 hover:text-red-500" />
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">

          <input name="username" placeholder="Username"
            onChange={handleChange}
            className="input" />

          <input name="password" type="password" placeholder="Contraseña"
            onChange={handleChange}
            className="input" />

          <input name="first_name" placeholder="Nombre"
            onChange={handleChange}
            className="input" />

          <input name="last_name" placeholder="Apellido"
            onChange={handleChange}
            className="input" />

          <input name="email" placeholder="Email"
            onChange={handleChange}
            className="input col-span-2" />

          <input name="cedula" placeholder="Cédula"
            onChange={handleChange}
            className="input" />

          <input name="telefono" placeholder="Teléfono"
            onChange={handleChange}
            className="input" />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all"
        >
          <UserPlus size={18} />
          {loading ? "Creando..." : "Crear Barbero"}
        </button>
      </div>
    </div>
  );
};

export default CrearBarbero;