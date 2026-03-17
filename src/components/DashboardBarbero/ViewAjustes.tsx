import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save, Scissors, BellRing, Info } from 'lucide-react';

export default function ViewAjustes() {
  const [formData, setFormData] = useState({
    nombre: 'Carlos Barbero',
    email: 'carlos@barbertech.com',
    telefono: '+57 300 123 4567',
    especialidad: 'Tijeras & Barbería Clásica',
    bio: 'Más de 5 años de experiencia haciendo los mejores desvanecidos del distrito.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificaciones, setNotificaciones] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perfil actualizado correctamente");
  };

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Ajustes de Perfil
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Actualiza tu información pública, notificaciones y credenciales de acceso.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Panel Izquierdo: Resumen y Preferencias rápidas */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-28 h-28 mb-4 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-primary/30 relative overflow-hidden group">
              CB
              <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
                <span className="text-xs font-bold text-white">Editar Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-bold dark:text-white">{formData.nombre}</h3>
            <p className="text-sm font-medium text-primary mt-1">{formData.especialidad}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 px-4">
              Mantener tu perfil actualizado es importante para que tus clientes confíen en ti.
            </p>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
            <h4 className="font-bold flex items-center gap-2 mb-4 dark:text-white">
              <BellRing size={18} /> Preferencias
            </h4>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold dark:text-white">Notificaciones de citas</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Recibir un correo al reservar</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notificaciones} onChange={() => setNotificaciones(!notificaciones)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Formulario Completo */}
        <div className="lg:col-span-2 bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-8 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            
            <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-2">
              <Info size={20} className="text-primary" /> Información General
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User size={16} /> Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Scissors size={16} /> Especialidad
                </label>
                <input
                  type="text"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail size={16} /> Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Phone size={16} /> Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Info size={16} /> Biografía Corta
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all text-sm resize-none"
              ></textarea>
            </div>

            <hr className="border-slate-200 dark:border-border-dark my-8" />

            <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-2">
              <Lock size={20} className="text-primary" /> Seguridad
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full md:w-1/2 p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                   Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all text-sm"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all text-sm"
              >
                <Save size={18} />
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
