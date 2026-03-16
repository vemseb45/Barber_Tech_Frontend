import React, { useState, useEffect } from 'react';
import { UserPlus, Search } from 'lucide-react';
import api from '../../api/axios';
import type { Usuario } from '../../types';

const ViewUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(false);

  // Conexión con tu backend
  useEffect(() => {
    const cargarUsuarios = async () => {
      setCargando(true);
      try {
        const res = await api.get('usuarios/');
        const data = res.data.data || res.data;
        setUsuarios(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Error al cargar usuarios:", err);
      } finally {
        setCargando(false);
      }
    };
    cargarUsuarios();
  }, []);

  // Tu función para cambiar roles
  const handleCambiarRol = async (id: number, nuevoRol: string) => {
    try {
      await api.patch(`usuarios/${id}/cambiar_rol/`, { rol: nuevoRol });
      setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u)));
    } catch (err) {
      alert("Error al actualizar el rol");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e1b33] focus:ring-2 focus:ring-[#7924c7]/20 focus:border-[#7924c7] outline-none transition-all dark:text-white"
          />
        </div>
        <button className="bg-[#7924c7] hover:bg-[#5213fc] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#7924c7]/20 font-medium">
          <UserPlus size={20} />
          <span>Añadir Usuario</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e1b33] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol Actual</th>
                <th className="px-6 py-4 text-center">Acciones Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {cargando ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-slate-500 font-medium animate-pulse">
                    Cargando usuarios desde el servidor...
                  </td>
                </tr>
              ) : usuarios.length === 0 ? (
                <tr>
                   <td colSpan={3} className="text-center py-8 text-slate-500 font-medium">
                    No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                usuarios.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                          user.rol === 'Admin' ? 'bg-purple-100 text-purple-600' : 
                          user.rol === 'Barbero' ? 'bg-orange-100 text-orange-600' : 
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {user.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-sm dark:text-white">{user.username}</p>
                          <p className="text-xs text-slate-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                        user.rol === 'Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                        user.rol === 'Barbero' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {user.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        {user.rol !== 'Barbero' && (
                          <button 
                            onClick={() => handleCambiarRol(user.id, 'Barbero')}
                            className="text-[10px] font-bold px-3 py-1.5 border border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-900/50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                          >
                            Hacer Barbero
                          </button>
                        )}
                        {user.rol !== 'Admin' && (
                          <button 
                            onClick={() => handleCambiarRol(user.id, 'Admin')}
                            className="text-[10px] font-bold px-3 py-1.5 border border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-900/50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                          >
                            Hacer Admin
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewUsuarios;