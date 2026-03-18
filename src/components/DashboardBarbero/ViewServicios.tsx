import { useState, useEffect } from 'react';
import { Plus, Clock, Scissors, Edit2, Layers, Droplets } from 'lucide-react';

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
      description: 'Corte clásico o moderno personalizado según tu estilo, con acabado profesion...',
      duration: '30 min',
      category: 'Cabello',
      icon: Scissors,
      // Usando imagen de Unsplash para demostrar el concepto
      image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=500&auto=format&fit=crop',
      tag: 'Popular'
    },
    {
      id: 2,
      name: 'Arreglo de Barba',
      price: '$15.00',
      description: 'Perfilado preciso, rebaje de volumen y tratamiento de hidratación con aceites...',
      duration: '25 min',
      category: 'Barba',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Tratamiento Facial',
      price: '$30.00',
      description: 'Limpieza profunda con vapor, exfoliación y mascarilla refrescante para una piel...',
      duration: '45 min',
      category: 'Tratamientos',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Combo Imperial',
      price: '$45.00',
      description: 'Nuestra experiencia completa: Corte Premium + Arreglo de Barba + Lavado...',
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

  // Formulario de estado para el modal
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    duracion_minutos: '',
    id_especialidad: 1 // Por defecto
  });

  // ========== LÓGICA DE API (DJANGO) ==========
  const API_URL = 'http://127.0.0.1:8000/api/servicios/'; // Ajustar según la ruta exacta de tu backend en Django

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    try {
      setIsLoading(true);
      // Descomentar cuando Django esté listo:
      // const response = await fetch(API_URL);
      // const data = await response.json();
      // setServiciosData(data); // Asumiendo que retorna un array de objetos
      
      // Simulamos la carga temporalmente
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setIsLoading(false);
    }
  };

  const handleOpenModal = (servicio: ServicioType | null = null) => {
    if (servicio) {
      setEditingService(servicio);
      setFormData({
        nombre: servicio.name,
        descripcion: servicio.description,
        precio: servicio.price.replace('$', ''),
        duracion_minutos: servicio.duration.replace(' min', ''),
        id_especialidad: 1 // Ajustar con la info real de la BD
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
    try {
      /* Descomentar cuando la API reciba datos:
      const method = editingService ? 'PUT' : 'POST';
      const url = editingService ? `${API_URL}${editingService.id}/` : API_URL;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if(response.ok) {
         fetchServicios();
         closeModal();
      }
      */
      
      // Simulación de guardado exitoso para la UI temporalmente
      alert(`Servicio ${editingService ? 'editado' : 'creado'} correctamente (Simulación)`);
      closeModal();

    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Servicios</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Administra y actualiza tu catálogo de servicios profesionales</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all text-sm"
        >
          <Plus size={18} />
          Nuevo Servicio
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 dark:border-border-dark mb-8 overflow-x-auto custom-scrollbar">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
              tab === activeTab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          serviciosData.filter(s => activeTab === 'Todos' || s.category === activeTab).map((servicio) => {
             const Icon = servicio.icon || Scissors;
             return (
            <div key={servicio.id} className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden flex flex-col shadow-sm group hover:shadow-md transition-shadow">
              
              <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                <img src={servicio.image} alt={servicio.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {servicio.tag && (
                  <span className={`absolute top-4 right-4 text-[10px] font-black px-3 py-1.5 rounded-full z-10 ${servicio.tagColor || 'bg-white/90 text-slate-800 backdrop-blur-sm shadow-sm'}`}>
                    {servicio.tag}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg dark:text-white leading-tight">{servicio.name}</h3>
                  <span className="font-black text-primary text-xl">{servicio.price}</span>
                </div>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                  {servicio.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 mb-6 mt-auto">
                  <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-400" /> {servicio.duration}</span>
                  <span className="flex items-center gap-1.5"><Icon size={16} className="text-slate-400" /> {servicio.category}</span>
                </div>
                
                <button onClick={() => handleOpenModal(servicio)} className="w-full py-2.5 rounded-xl border-2 border-primary/20 dark:border-primary/40 text-primary font-bold text-sm hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                  <Edit2 size={16} /> Editar Servicio
                </button>
              </div>

            </div>
           );
          })
        )}

        {/* Add New Service Card */}
         <div onClick={() => handleOpenModal()} className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border-dark flex flex-col items-center justify-center p-8 text-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:border-primary/50 transition-colors cursor-pointer min-h-[400px]">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mb-4 text-slate-600 dark:text-slate-300 shadow-inner block overflow-hidden relative">
             <Plus size={24} className="z-10 relative" />
          </div>
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Agregar nuevo servicio</h3>
          <p className="text-sm">Expande tu catálogo</p>
        </div>

      </div>

      {/* =========== MODAL CREAR / EDITAR =========== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-border-dark animate-in slide-in-from-bottom-8 duration-300">
            
            <div className="px-6 py-4 border-b border-slate-100 dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                {editingService ? <Edit2 size={20} className="text-primary"/> : <Plus size={20} className="text-primary"/>}
                {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h3>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors">✕</button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-4">
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nombre del Servicio</label>
                  <input required name="nombre" value={formData.nombre} onChange={handleChange} type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400" placeholder="Ej. Corte de Cabello" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Precio ($)</label>
                    <input required name="precio" value={formData.precio} onChange={handleChange} type="number" step="0.01" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="25.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Duración (min)</label>
                    <input required name="duracion_minutos" value={formData.duracion_minutos} onChange={handleChange} type="number" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="45" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Especialidad (Categoría)</label>
                  <select name="id_especialidad" value={formData.id_especialidad} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all">
                    <option value={1}>Corte de Cabello</option>
                    <option value={2}>Barba y Bigote</option>
                    <option value={3}>Colorimetría</option>
                    <option value={4}>Tratamientos Capilares</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Descripción</label>
                  <textarea required name="descripcion" value={formData.descripcion} onChange={handleChange} rows={3} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none placeholder:text-slate-400" placeholder="¿Qué incluye este servicio?"></textarea>
                </div>

              </div>

              <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-border-dark">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-[#5213fc] transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                  Guardar Servicio
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
