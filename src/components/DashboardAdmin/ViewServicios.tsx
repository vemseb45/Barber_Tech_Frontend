import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Clock, DollarSign } from 'lucide-react';
import type { Servicio } from '../../types';

const ViewServicios: React.FC = () => {
  // Comentario: Endpoints REST
  // GET /api/servicios/
  // POST /api/servicios/
  // PUT /api/servicios/:id
  // DELETE /api/servicios/:id

  const [servicios] = useState<Servicio[]>([
    {
      id: '1',
      nombre: 'Corte Clásico',
      descripcion: 'Estilo tradicional con tijera y máquina. Incluye lavado.',
      precio: 25.00,
      duracion: 30,
      imagen: 'https://picsum.photos/seed/haircut/400/300'
    },
    {
      id: '2',
      nombre: 'Perfilado de Barba',
      descripcion: 'Ritual de toalla caliente, aceites esenciales y navaja.',
      precio: 15.00,
      duracion: 20,
      imagen: 'https://picsum.photos/seed/beard/400/300'
    },
    {
      id: '3',
      nombre: 'Limpieza Facial',
      descripcion: 'Exfoliación profunda y mascarilla hidratante.',
      precio: 35.00,
      duracion: 45,
      imagen: 'https://picsum.photos/seed/facial/400/300'
    },
    {
      id: '4',
      nombre: 'Corte + Barba',
      descripcion: 'Combo completo para un look impecable.',
      precio: 35.00,
      duracion: 50,
      imagen: 'https://picsum.photos/seed/combo/400/300'
    }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold dark:text-white">Catálogo de Servicios</h2>
          <p className="text-sm text-slate-500">Gestiona los servicios ofrecidos en tus sucursales</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20 font-medium">
          <Plus size={20} />
          <span>Nuevo Servicio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servicios.map((servicio) => (
          <div 
            key={servicio.id} 
            className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-48 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
              <img
                src={servicio.imagen}
                alt={servicio.nombre}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-xl font-bold text-primary text-sm shadow-lg flex items-center gap-1">
                <DollarSign size={14} />
                {servicio.precio.toFixed(2)}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-[10px] font-semibold flex items-center gap-1">
                <Clock size={12} />
                {servicio.duracion} min
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg dark:text-white group-hover:text-primary transition-colors">{servicio.nombre}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 h-10">
                {servicio.descripcion}
              </p>
              
              <div className="flex gap-2 mt-6">
                <button className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-semibold flex items-center justify-center gap-2 dark:text-white">
                  <Edit3 size={16} />
                  Editar
                </button>
                <button className="p-2.5 rounded-xl border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
