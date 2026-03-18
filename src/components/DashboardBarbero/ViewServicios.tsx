import { useState, useEffect } from 'react';
import { Plus, Clock, Scissors, Edit2, Layers, Droplets, Image as ImageIcon } from 'lucide-react';

interface ServicioType {
  id: number;
  name: string;
  price: string;
  description: string;
  duration: string;
  category: string;
  icon?: any;
  image?: string;
  tagColor?: string;
  tag?: string;
}

export default function ViewServicios() {
  const [activeTab, setActiveTab] = useState('Todos');
  const tabs = ['Todos', 'Cabello', 'Barba', 'Tratamientos', 'Combos'];

  const servicios = [
    {
      id: 1,
      name: 'Corte de Cabello',
      price: '$20.00',
      description: 'Corte clásico o moderno personalizado según tu estilo, con acabado profesional y productos premium.',
      duration: '30 min',
      category: 'Cabello',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=500&auto=format&fit=crop',
      tag: 'Popular'
    },
    {
      id: 2,
      name: 'Arreglo de Barba',
      price: '$15.00',
      description: 'Perfilado preciso, rebaje de volumen y tratamiento de hidratación con aceites esenciales.',
      duration: '25 min',
      category: 'Barba',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Tratamiento Facial',
      price: '$30.00',
      description: 'Limpieza profunda con vapor, exfoliación y mascarilla refrescante para una piel renovada.',
      duration: '45 min',
      category: 'Tratamientos',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Combo Imperial',
      price: '$45.00',
      description: 'Nuestra experiencia completa: Corte Premium + Arreglo de Barba + Lavado y Tratamiento.',
      duration: '60 min',
      category: 'Combos',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=500&auto=format&fit=crop',
      tagColor: 'bg-yellow-400 text-yellow-900',
      tag: 'MEJOR VALOR'
    }
  ];

  const [serviciosData, setServiciosData] = useState<ServicioType[]>(servicios); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServicioType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    duracion_minutos: '',
    id_especialidad: 1
  });

  const handleOpenModal = (servicio: ServicioType | null = null) => {
    if (servicio) {
      setEditingService(servicio);
      setFormData({
        nombre: servicio.name,
        descripcion: servicio.description,
        precio: servicio.price.replace('$', ''),
        duracion_minutos: servicio.duration.replace(' min', ''),
        id_especialidad: 1
      });
    } else {
      setEditingService(null);
      setFormData({ nombre: '', descripcion: '', precio: '', duracion_minutos: '', id_especialidad: 1 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Servicio ${editingService ? 'actualizado' : 'creado'} con éxito`);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER SECCIÓN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Servicios</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona el catálogo de tu barbería</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#7112b3] text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer text-sm"
        >
          <Plus size={20} />
          Nuevo Servicio
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-slate-400">Cargando catálogo...</p>
          </div>
        ) : (
          serviciosData.filter(s => activeTab === 'Todos' || s.category === activeTab).map((servicio) => {
            const Icon = servicio.icon || Scissors;
            return (
              <div key={servicio.id} className="group bg-white dark:bg-[#1e293b] rounded-[32px] border border-slate-200 dark:border-slate-700/50 overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                
                {/* Imagen del Servicio */}
                <div className="h-52 relative overflow-hidden">
                  <img 
                    src={servicio.image} 
                    alt={servicio.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  
                  {servicio.tag && (
                    <span className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg ${servicio.tagColor || 'bg-white/90 text-slate-900'}`}>
                      {servicio.tag}
                    </span>
                  )}

                  <div className="absolute bottom-4 left-6">
                    <span className="text-2xl font-black text-white drop-shadow-md">{servicio.price}</span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-slate-800 dark:text-white">{servicio.name}</h3>
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Icon size={18} />
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                    {servicio.description}
                  </p>
                  
                  <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8 mt-auto">
                    <span className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {servicio.duration}</span>
                    <span className="flex items-center gap-2 text-primary/80">{servicio.category}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleOpenModal(servicio)} 
                    className="w-full py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Edit2 size={16} /> Editar Detalles
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* Card Agregar Nuevo (Estilo Placeholder) */}
        <button 
          onClick={() => handleOpenModal()} 
          className="rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-10 text-center group hover:bg-white dark:hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 cursor-pointer min-h-[450px]"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all text-slate-400 shadow-inner">
            <Plus size={32} />
          </div>
          <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">Nuevo Servicio</h3>
          <p className="text-sm text-slate-400 max-w-[200px]">Haz crecer tu negocio añadiendo más opciones</p>
        </button>
      </div>

      {/* MODAL (Refinado) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={closeModal}></div>
          
          <div className="relative bg-white dark:bg-[#1e293b] rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {editingService ? 'Modificar Servicio' : 'Crear Servicio'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">Completa la información detallada</p>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Nombre</label>
                  <input required name="nombre" value={formData.nombre} onChange={handleChange} type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Precio ($)</label>
                    <input required name="precio" value={formData.precio} onChange={handleChange} type="number" step="0.01" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-slate-900 dark:text-white outline-none focus:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Duración (min)</label>
                    <input required name="duracion_minutos" value={formData.duracion_minutos} onChange={handleChange} type="number" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-slate-900 dark:text-white outline-none focus:border-primary transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Descripción</label>
                  <textarea required name="descripcion" value={formData.descripcion} onChange={handleChange} rows={3} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-slate-900 dark:text-white outline-none focus:border-primary transition-all resize-none"></textarea>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 py-4 rounded-2xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" className="flex-[2] py-4 bg-primary text-white font-bold rounded-2xl hover:bg-[#7112b3] shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}