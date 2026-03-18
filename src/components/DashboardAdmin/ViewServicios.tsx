import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Clock, DollarSign, Sparkles } from 'lucide-react';
import type { Servicio } from '../../types';

const ViewServicios: React.FC = () => {
  // Datos locales de ejemplo (Simulación de GET /api/servicios/)
  const [servicios] = useState<Servicio[]>([
    {
      id: '1',
      nombre: 'Corte Clásico',
      descripcion: 'Estilo tradicional con tijera y máquina. Incluye lavado y asesoría de imagen.',
      precio: 25.00,
      duracion: 30,
      imagen: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '2',
      nombre: 'Perfilado de Barba',
      descripcion: 'Ritual de toalla caliente, aceites esenciales y navaja para un acabado perfecto.',
      precio: 15.00,
      duracion: 20,
      imagen: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '3',
      nombre: 'Limpieza Facial',
      descripcion: 'Exfoliación profunda con productos premium y mascarilla hidratante.',
      precio: 35.00,
      duracion: 45,
      imagen: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '4',
      nombre: 'Corte + Barba',
      descripcion: 'Nuestro combo estrella. Corte premium y perfilado de barba completo.',
      precio: 35.00,
      duracion: 50,
      imagen: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=60'
    }
  ]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* HEADER DE SECCIÓN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Sparkles className="text-primary" size={28} />
            Catálogo de Servicios
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Define los estilos y tratamientos disponibles para tus clientes.
          </p>
        </div>
        
        <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-[20px] flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/25 font-bold text-sm cursor-pointer active:scale-95">
          <Plus size={20} strokeWidth={3} />
          <span>Añadir Nuevo Servicio</span>
        </button>
      </div>

      {/* GRID DE SERVICIOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {servicios.map((servicio) => (
          <div 
            key={servicio.id} 
            className="group bg-white dark:bg-[#1e293b] rounded-[32px] border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full"
          >
            {/* CONTENEDOR DE IMAGEN */}
            <div className="h-56 relative overflow-hidden">
              <img
                src={servicio.imagen}
                alt={servicio.nombre}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* CAPA DE GRADIENTE */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* BADGES FLOTANTES */}
              <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl font-black text-primary text-sm shadow-xl flex items-center gap-1 group-hover:scale-110 transition-transform">
                <DollarSign size={14} strokeWidth={3} />
                {servicio.precio.toFixed(0)}
              </div>
              
              <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/10">
                <Clock size={14} className="text-primary" />
                {servicio.duracion} MIN
              </div>
            </div>

            {/* CUERPO DE LA TARJETA */}
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h4 className="font-bold text-xl text-slate-800 dark:text-white group-hover:text-primary transition-colors duration-300">
                  {servicio.nombre}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-2 italic">
                  "{servicio.descripcion}"
                </p>
              </div>
              
              {/* BOTONES DE ACCIÓN */}
              <div className="flex gap-3 mt-auto pt-4">
                <button className="flex-1 py-3 px-4 rounded-[16px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer">
                  <Edit3 size={16} />
                  Modificar
                </button>
                <button className="p-3 rounded-[16px] border border-red-50 dark:border-red-900/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewServicios;