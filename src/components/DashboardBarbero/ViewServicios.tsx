import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Clock, DollarSign, Sparkles, Server } from 'lucide-react';

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  imagen: string;
  categoria: string;
}

const CONST_MASTER_SERVICIOS: Servicio[] = [
  { id: '1', nombre: 'Corte Clásico', descripcion: 'Estilo tradicional con tijera y máquina. Incluye lavado y asesoría de imagen.', precio: 25.00, duracion: 30, imagen: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&auto=format&fit=crop&q=60', categoria: 'Cabello' },
  { id: '2', nombre: 'Perfilado de Barba', descripcion: 'Ritual de toalla caliente, aceites esenciales y navaja para un acabado perfecto.', precio: 15.00, duracion: 20, imagen: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&auto=format&fit=crop&q=60', categoria: 'Barba' },
  { id: '3', nombre: 'Limpieza Facial', descripcion: 'Exfoliación profunda con productos premium y mascarilla hidratante.', precio: 35.00, duracion: 45, imagen: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&auto=format&fit=crop&q=60', categoria: 'Tratamientos' },
  { id: '4', nombre: 'Corte + Barba', descripcion: 'Nuestro combo estrella. Corte premium y perfilado de barba completo.', precio: 35.00, duracion: 50, imagen: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=60', categoria: 'Combos' },
  { id: '5', nombre: 'Corte de Niño', descripcion: 'Corte clásico para los más pequeños con paciencia y cuidado.', precio: 15.00, duracion: 30, imagen: 'https://plus.unsplash.com/premium_photo-1661720625480-d699b4836f44?w=500&auto=format&fit=crop&q=60', categoria: 'Cabello' },
  { id: '6', nombre: 'Tinte Global', descripcion: 'Cambio de color o cobertura de canas con productos de alta calidad.', precio: 45.00, duracion: 60, imagen: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=60', categoria: 'Tratamientos' },
  { id: '7', nombre: 'Diseño', descripcion: 'Diseños artísticos y líneas precisas en el cabello.', precio: 10.00, duracion: 20, imagen: 'https://plus.unsplash.com/premium_photo-1677444398670-4f5aaaef65eb?w=500&auto=format&fit=crop&q=60', categoria: 'Cabello' },
  { id: '8', nombre: 'Masaje Capilar', descripcion: 'Masaje relajante en el cuero cabelludo para estimular el crecimiento.', precio: 20.00, duracion: 15, imagen: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&auto=format&fit=crop&q=60', categoria: 'Tratamientos' }
];

export default function ViewServicios() {
  const [misServicios, setMisServicios] = useState<Servicio[]>([
    CONST_MASTER_SERVICIOS[0], 
    CONST_MASTER_SERVICIOS[1]
  ]);

  const [activeTab, setActiveTab] = useState('Todos');
  const tabs = ['Todos', 'Cabello', 'Barba', 'Tratamientos', 'Combos'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Servicio | null>(null);

  const [formData, setFormData] = useState({
    idSeleccionado: '',
    nombre: '',
    descripcion: '',
    precio: '',
    duracion: '',
    imagen: '',
    categoria: ''
  });

  const availableServicesToOffer = CONST_MASTER_SERVICIOS.filter(
    master => !misServicios.some(mi => mi.id === master.id)
  );

  const handleOpenModal = (servicio: Servicio | null = null) => {
    if (servicio) {
      setEditingService(servicio);
      setFormData({
        idSeleccionado: servicio.id,
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        precio: servicio.precio.toString(),
        duracion: servicio.duracion.toString(),
        imagen: servicio.imagen,
        categoria: servicio.categoria
      });
    } else {
      setEditingService(null);
      setFormData({
        idSeleccionado: '',
        nombre: '',
        descripcion: '',
        precio: '',
        duracion: '',
        imagen: '',
        categoria: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const parentService = CONST_MASTER_SERVICIOS.find(s => s.id === selectedId);
    if (parentService) {
      setFormData({
        idSeleccionado: parentService.id,
        nombre: parentService.nombre,
        descripcion: parentService.descripcion,
        precio: parentService.precio.toString(),
        duracion: parentService.duracion.toString(),
        imagen: parentService.imagen,
        categoria: parentService.categoria
      });
    } else {
      setFormData({ ...formData, idSeleccionado: '', nombre: '', descripcion: '', precio: '', duracion: '', imagen: '', categoria: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idSeleccionado && !editingService) {
      alert("Por favor selecciona un servicio global de la lista");
      return;
    }
    
    const numPrecio = parseFloat(formData.precio) || 0;
    const numDuracion = parseInt(formData.duracion, 10) || 0;

    if (editingService) {
      setMisServicios(misServicios.map(s => s.id === editingService.id ? {
        ...s,
        precio: numPrecio,
        duracion: numDuracion
      } : s));
    } else {
      const baseService = CONST_MASTER_SERVICIOS.find(s => s.id === formData.idSeleccionado);
      if (baseService) {
        const newService: Servicio = {
          ...baseService,
          precio: numPrecio,
          duracion: numDuracion
        };
        setMisServicios([...misServicios, newService]);
      }
    }
    closeModal();
  };

  const handleDelete = (id: string, nombre: string) => {
    if (window.confirm(`¿Estás seguro que deseas dejar de ofrecer el servicio: ${nombre}?`)) {
      setMisServicios(misServicios.filter(s => s.id !== id));
    }
  };

  const filteredServicios = misServicios.filter(s => activeTab === 'Todos' || s.categoria === activeTab);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* HEADER DE SECCIÓN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Sparkles className="text-primary" size={28} />
            Mis Servicios
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Elige los servicios que realizarás y personaliza el costo / tiempo.
          </p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()} 
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-[20px] flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/25 font-bold text-sm cursor-pointer active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          <span>Ofrecer Nuevo Servicio</span>
        </button>
      </div>

      {/* FILTROS TABS */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl w-fit overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              tab === activeTab 
                ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* GRID DE SERVICIOS */}
      {filteredServicios.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] text-center mt-4">
          <Server size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Aún no ofreces servicios en esta categoría</h3>
          <p className="text-slate-500 mt-2">Haz clic arriba para agregar servicios a tu perfil.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filteredServicios.map((servicio) => (
            <div 
              key={servicio.id} 
              className="group bg-white dark:bg-[#1e293b] rounded-[32px] border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full relative"
            >
              {/* CONTENEDOR DE IMAGEN */}
              <div className="h-56 relative overflow-hidden">
                <img
                  src={servicio.imagen}
                  alt={servicio.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* CATEGORIA BADGE */}
                <div className="absolute top-4 left-4 font-bold text-[10px] px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg bg-white/90 text-slate-900 border border-black/5 uppercase">
                  {servicio.categoria}
                </div>

                <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl font-black text-primary text-sm shadow-xl flex items-center gap-1 group-hover:scale-110 transition-transform">
                  <DollarSign size={14} strokeWidth={3} />
                  {servicio.precio.toFixed(2)}
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
                
                <div className="flex gap-3 mt-auto pt-4">
                  <button 
                    onClick={() => handleOpenModal(servicio)} 
                    className="flex-1 py-3 px-4 rounded-[16px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Edit3 size={16} />
                    Personalizar
                  </button>
                  <button 
                    onClick={() => handleDelete(servicio.id, servicio.nombre)} 
                    className="p-3 rounded-[16px] border border-red-50 dark:border-red-900/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                    title="Dejar de ofrecer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL PARA CREAR/EDITAR BARBERO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={closeModal}></div>
          
          <div className="relative bg-white dark:bg-[#1e293b] rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Sparkles className="text-primary" size={24} />
                  {editingService ? 'Personalizar Servicio' : 'Añadir a mi Perfil'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Tu precio y duración únicos.
                </p>
              </div>
              <button 
                onClick={closeModal} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer text-slate-400"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-4">
                
                {!editingService && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Seleccionar desde el Catálogo global</label>
                    <select
                      required
                      value={formData.idSeleccionado}
                      onChange={handleSelectChange}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Selecciona el servicio a agregar...</option>
                      {availableServicesToOffer.map(s => (
                        <option key={s.id} value={s.id}>{s.nombre} ({s.categoria}) - Base: ${s.precio}</option>
                      ))}
                    </select>
                  </div>
                )}

                {(formData.idSeleccionado || editingService) && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Servicio elegido</label>
                        <div className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-500 dark:text-slate-300 font-medium">
                          {formData.nombre}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Categoría</label>
                        <div className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-500 dark:text-slate-300 font-medium uppercase text-sm">
                          {formData.categoria}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Mi Precio ($)</label>
                        <input 
                          readOnly 
                          name="precio" 
                          value={formData.precio} 
                          type="number" 
                          step="0.01" 
                          placeholder="Tu precio final"
                          className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent rounded-xl px-5 py-3 text-slate-500 dark:text-slate-400 outline-none transition-all font-bold cursor-not-allowed opacity-70" 
                          title="Contacta al Administrador si necesitas modificar el precio base."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Mi Duración (min)</label>
                        <input 
                          required 
                          name="duracion" 
                          value={formData.duracion} 
                          onChange={handleChange} 
                          type="number" 
                          placeholder="Tu tiempo final"
                          className="w-full bg-white dark:bg-slate-900 border border-primary/50 rounded-xl px-5 py-3 text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-4 ring-primary/10 transition-all font-bold text-primary" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Descripción Global</label>
                      <p className="text-sm italic text-slate-500 dark:text-slate-400 line-clamp-3">
                        {formData.descripcion}
                      </p>
                    </div>
                  </>
                )}

              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="flex-1 py-4 rounded-2xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={!formData.idSeleccionado && !editingService}
                  className="flex-[2] py-4 bg-primary text-white font-bold rounded-2xl hover:bg-[#7112b3] shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {editingService ? <Edit3 size={18} /> : <Plus size={18} />}
                  Guardar Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}