import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Shield, User, Scissors, Calendar, Trash2, MoreVertical } from 'lucide-react';
import api from '../../api/axios';
import type { Usuario } from '../../types';
import ModalAsignarHorario from './asignarHorario'; // Asegúrate de que la ruta sea correcta

const ViewUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);

  // Estados para el Modal de Horarios
  const [modalOpen, setModalOpen] = useState(false);
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<{ id: number; nombre: string } | null>(null);

  // 1. CARGAR TODOS LOS USUARIOS AL INICIO
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

  // 2. CAMBIAR ROL (Admin, Barbero, Cliente)
  const handleCambiarRol = async (id: number, nuevoRol: string) => {
    try {
      await api.patch(`usuarios/${id}/cambiar_rol/`, { rol: nuevoRol });
      setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u)));
    } catch (err) {
      alert("Error al actualizar el rol");
    }
  };

  // 3. FUNCIÓN PARA ABRIR EL MODAL DE HORARIOS
  const abrirModalHorario = (id: number, nombre: string) => {
    setBarberoSeleccionado({ id, nombre });
    setModalOpen(true);
  };

  // 4. FILTRADO POR BÚSQUEDA (Muestra todos los roles)
  const usuariosFiltrados = usuarios.filter(u => 
    u.username?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Gestión de Usuarios</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Administra los accesos, roles y horarios del equipo.</p>
        </div>
        
        <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/25 font-bold text-sm cursor-pointer active:scale-95">
          <UserPlus size={20} />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre de usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all dark:text-white font-medium"
          />
        </div>
      </div>

      {/* TABLA DE USUARIOS */}
      <div className="bg-white dark:bg-[#1e293b] rounded-[32px] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Perfil de Usuario</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Nivel de Acceso</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {cargando ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center">
                    <p className="text-slate-400 font-medium">No se encontraron usuarios.</p>
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm ${
                          user.rol === 'Admin' ? 'bg-purple-500/10 text-purple-600' : 
                          user.rol === 'Barbero' ? 'bg-orange-500/10 text-orange-600' : 
                          'bg-blue-500/10 text-blue-600'
                        }`}>
                          {user.username?.substring(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">{user.username}</p>
                          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tighter">ID: UID-{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold ${
                        user.rol === 'Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                        user.rol === 'Barbero' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {user.rol === 'Admin' ? <Shield size={14} /> : user.rol === 'Barbero' ? <Scissors size={14} /> : <User size={14} />}
                        {user.rol}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-3">
                        
                        {/* 🔹 ACCIÓN SOLO PARA BARBEROS: Gestionar Horarios */}
                        {user.rol === 'Barbero' && (
                          <button 
                            onClick={() => abrirModalHorario(user.id, user.username)}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-[11px] font-black transition-all shadow-md hover:bg-orange-700 hover:-translate-y-0.5 active:scale-95"
                          >
                            <Calendar size={14} />
                            HORARIOS
                          </button>
                        )}

                        {/* Cambio de Rol a Barbero */}
                        {user.rol !== 'Barbero' && (
                          <button 
                            onClick={() => handleCambiarRol(user.id, 'Barbero')}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-orange-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 rounded-xl text-[11px] font-black transition-all cursor-pointer shadow-sm"
                          >
                            HACER BARBERO
                          </button>
                        )}

                        {/* Cambio de Rol a Admin */}
                        {user.rol !== 'Admin' && (
                          <button 
                            onClick={() => handleCambiarRol(user.id, 'Admin')}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 rounded-xl text-[11px] font-black transition-all cursor-pointer shadow-sm"
                          >
                            HACER ADMIN
                          </button>
                        )}

                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 COMPONENTE MODAL INTEGRADO */}
      {barberoSeleccionado && (
        <ModalAsignarHorario 
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setBarberoSeleccionado(null);
          }}
          barberoId={barberoSeleccionado.id}
          nombreBarbero={barberoSeleccionado.nombre}
        />
      )}
    </div>
  );
};

export default ViewUsuarios;