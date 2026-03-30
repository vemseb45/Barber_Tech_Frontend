import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import "../index.css";
import { Sun, Moon, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

const servicesData = [
  { img: "/Imagenes/cortecabello.png", title: "Corte de Cabello", desc: "Cortes clasicos y de tendencia.", price: "$25", time: "45 min" },
  { img: "/Imagenes/barba.png", title: "Arreglo de Barba", desc: "Perfilado preciso e hidratacion.", price: "$15", time: "30 min" },
  { img: "/Imagenes/tratamiento.png", title: "Tratamiento Facial", desc: "Limpieza profunda y masaje.", price: "$20", time: "40 min" }
];

const testimonialsData = [
  { init: "CM", name: "Carlos Mendez", date: "Cliente desde 2022", text: "La mejor barberia de la ciudad." },
  { init: "RG", name: "Roberto Garcia", date: "Cliente frecuente", text: "El servicio de arreglo de barba es otro nivel." },
  { init: "JP", name: "Juan Perez", date: "Cliente nuevo", text: "Moderno, limpio y muy profesional." }
];

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setActiveService(prev => (prev + 1) % servicesData.length);
    }, 5000);
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => {
      clearInterval(serviceInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const navigate = useNavigate();
  const hasSession = false;

  const handleReservation = () => {
    if (hasSession) {
      navigate('/DashboardCliente');
    } else {
      navigate('/login');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Variantes
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
  };
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const scaleUpVariant: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", bounce: 0.4 } }
  };
  const dropDownVariant: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  const navLinks = [
    { href: "#inicio", name: "Inicio" },
    { href: "#servicios", name: "Servicios" },
    { href: "#galeria", name: "Galería" },
    { href: "#testimonios", name: "Testimonios" },
    { href: "#contacto", name: "Contacto" }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans antialiased overflow-x-hidden transition-colors duration-500 flex flex-col">

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md dark:bg-[#0a0a0f]/80 transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          
          <motion.div variants={dropDownVariant} initial="hidden" animate="visible" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img 
              src="/Imagenes/Recurso 1.png" 
              alt="BarberTech Logo" 
              className="w-12 h-12 sm:w-20 sm:h-20 object-contain drop-shadow-lg" 
            />
            <h1 
              className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 ml-1 sm:ml-2" 
            >
              BarberTech
            </h1>
          </motion.div>

          <motion.nav
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((link, idx) => (
              <motion.a 
                key={idx} 
                variants={dropDownVariant} 
                whileHover={{ scale: 1.15, y: -4, rotate: (idx % 2 === 0 ? 3 : -3) }} 
                whileTap={{ scale: 0.85 }} 
                className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors relative group pb-1" 
                href={link.href} 
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
              </motion.a>
            ))}
          </motion.nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:scale-110 transition-all text-slate-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-yellow-400 cursor-pointer shadow-sm"
            >
              {isDarkMode ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
            </button>

            <motion.button
              animate={{
                y: [0, -4, 0],
                boxShadow: ["0px 4px 10px rgba(133,25,210,0.2)", "0px 10px 25px rgba(133,25,210,0.6)", "0px 4px 10px rgba(133,25,210,0.2)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, y: -4, backgroundColor: "#5213fc" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReservation}
              className="hidden sm:block rounded-full bg-primary px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg transition-all"
            >
              Reservar Cita
            </motion.button>
          </div>
        </div>

        {/* Mobile Navbar Menu - Mejorado para ocupar pantalla completa si es necesario */}
        <motion.div 
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-2xl dark:bg-[#0a0a0f]/95 shadow-2xl border-t border-primary/5"
        >
          <nav className="flex flex-col px-6 py-4 pb-8 space-y-1">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors py-4 border-b border-slate-100 dark:border-white/5 last:border-0" 
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { setIsMobileMenuOpen(false); handleReservation(); }}
              className="mt-6 w-full rounded-2xl bg-primary px-6 py-4 text-sm font-black uppercase text-white shadow-lg text-center tracking-widest"
            >
              Reservar Cita
            </button>
          </nav>
        </motion.div>
      </header>

      <main className="flex-grow">
        {/* Inicio / Hero */}
        <section className="relative overflow-hidden px-6 py-12 lg:px-10 lg:py-24" id="inicio">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col gap-6 sm:gap-8 text-center lg:text-left">
                <motion.div variants={fadeUpVariant} className="inline-flex w-fit mx-auto lg:mx-0 items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-primary/20">
                  <span>La mejor experiencia en barbería</span>
                </motion.div>
                <motion.h1 variants={fadeUpVariant} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                  Corte y Estilo con <span className="text-primary block sm:inline">Personalidad</span>
                </motion.h1>
                <motion.p variants={fadeUpVariant} className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
                  Tu mejor versión comienza aquí. Experiencia de barbería clásica apoyada con tecnología para hacer tu visita más rápida y cómoda.
                </motion.p>
                <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleReservation} className="w-full sm:w-auto rounded-2xl bg-primary px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-primary/30 transition-all">
                    Reservar Cita Ahora
                  </motion.button>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#servicios" className="w-full sm:w-auto rounded-2xl border border-primary/20 bg-white dark:bg-white/5 px-8 py-4 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors inline-flex items-center justify-center">
                    Ver Servicios
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Imagen principal - Adaptada para móvil */}
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="aspect-[4/5] w-full rounded-[32px] sm:rounded-[40px] bg-slate-200 bg-cover bg-center shadow-2xl transition-transform hover:scale-[1.02] duration-700 border-4 border-white dark:border-white/10" style={{ backgroundImage: 'url("/Imagenes/barbero1.avif")' }}></div>
                
                {/* Floating card - Solo visible desde tablet para no tapar en móvil */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -bottom-6 -left-6 hidden sm:block rounded-3xl bg-white dark:bg-[#1a1a24] p-6 shadow-2xl border border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-300"></div>
                      <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-400"></div>
                      <div className="h-10 w-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold">+5k</div>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Clientes Felices</p>
                      <p className="text-xs text-slate-500">Valoración 5.0 ★</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Servicios - Grid responsive */}
        <section className="bg-white dark:bg-black/20 px-6 py-20 lg:px-10 border-y border-slate-200 dark:border-white/5 transition-colors duration-300" id="servicios">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <motion.h2 variants={fadeUpVariant} className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl">Nuestros Servicios</motion.h2>
              <motion.div variants={fadeUpVariant} className="mt-4 flex justify-center">
                <div className="h-1.5 w-20 rounded-full bg-primary"></div>
              </motion.div>
            </div>

            {/* Slider en Movil */}
            <div className="block md:hidden relative pt-2 pb-8">
              <div className="overflow-hidden">
                <motion.div 
                  className="flex"
                  animate={{ x: `-${activeService * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {servicesData.map((s, i) => (
                    <div className="w-full shrink-0 px-2 flex justify-center" key={i}>
                      <div className="flex flex-col w-full h-full rounded-[32px] border border-black/5 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-8 shadow-lg">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                          <img src={s.img} alt={s.title} className="w-8 h-8 object-contain" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold">{s.title}</h3>
                        <p className="mb-6 text-slate-600 dark:text-slate-400 text-sm">{s.desc}</p>
                        <div className="mt-auto flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-6">
                          <span className="font-black text-primary text-xl">{s.price}</span>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Controles del Slider */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-4">
                {servicesData.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveService(i)}
                    className={`nav-dot w-2 h-2 rounded-full transition-all tracking-widest ${activeService === i ? 'bg-primary w-6' : 'bg-slate-300 dark:bg-white/20'}`}
                    aria-label={`Ir al servicio ${i + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => setActiveService(prev => prev === 0 ? servicesData.length - 1 : prev - 1)}
                className="absolute top-1/2 -left-2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a24] shadow-lg border border-black/5 dark:border-white/10 text-primary z-10 hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setActiveService(prev => (prev + 1) % servicesData.length)}
                className="absolute top-1/2 -right-2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a24] shadow-lg border border-black/5 dark:border-white/10 text-primary z-10 hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Grid en Desktop */}
            <div className="hidden md:grid gap-6 md:grid-cols-3">
              {servicesData.map((s, i) => (
                <motion.div key={i} variants={fadeUpVariant} whileHover={{ y: -10 }} className="flex flex-col rounded-[32px] border border-black/5 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-8 transition-all hover:shadow-2xl hover:border-primary/50 group">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                    <img src={s.img} alt={s.title} className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{s.title}</h3>
                  <p className="mb-6 text-slate-600 dark:text-slate-400 text-sm">{s.desc}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-6">
                    <span className="font-black text-primary text-xl">{s.price}</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Galeria - Grid 2 columnas en movil */}
        <section className="px-6 py-20 lg:px-10" id="galeria">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <motion.div variants={fadeUpVariant}>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl text-center md:text-left">Galería de Estilos</h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400 text-center md:text-left">Nuestro trabajo reciente.</p>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {["/Imagenes/corte1.png", "/Imagenes/corte2.jpg", "/Imagenes/corte3.jpg", "/Imagenes/corte4.jpg"].map((src, i) => (
                <motion.div key={i} variants={scaleUpVariant} whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2, zIndex: 10 }} className="aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-200 border-2 sm:border-4 border-white dark:border-white/10 shadow-lg">
                  <img className="h-full w-full object-cover transition-transform hover:scale-110 duration-500" src={src} alt={`Galeria ${i}`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonios - 1 columna movil */}
        <section className="bg-primary/5 px-6 py-20 lg:px-10" id="testimonios">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mx-auto max-w-7xl">
            <motion.h2 variants={fadeUpVariant} className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl mb-12 text-center">
              Lo que dicen nuestros clientes
            </motion.h2>
            {/* Slider en Movil */}
            <div className="block md:hidden relative pt-2 pb-8">
              <div className="overflow-hidden">
                <motion.div 
                  className="flex"
                  animate={{ x: `-${activeTestimonial * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {testimonialsData.map((t, idx) => (
                    <div className="w-full shrink-0 px-2 flex justify-center" key={idx}>
                      <div className="w-full rounded-3xl bg-white dark:bg-[#1a1a24] p-8 shadow-lg border border-black/5 dark:border-white/10 text-left">
                        <div className="mb-4 text-primary font-bold tracking-widest text-lg">★★★★★</div>
                        <p className="mb-6 italic text-slate-600 dark:text-slate-400 text-sm">"{t.text}"</p>
                        <div className="flex items-center gap-4 border-t border-black/5 dark:border-white/10 pt-4">
                          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black shrink-0">{t.init}</div>
                          <div>
                            <h4 className="font-bold text-sm">{t.name}</h4>
                            <p className="text-xs text-slate-500">{t.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Controles del Slider */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-4">
                {testimonialsData.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all tracking-widest ${activeTestimonial === i ? 'bg-primary w-6' : 'bg-slate-300 dark:bg-white/20'}`}
                    aria-label={`Ir al testimonio ${i + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonialsData.length - 1 : prev - 1)}
                className="absolute top-1/2 -left-2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a24] shadow-lg border border-black/5 dark:border-white/10 text-primary z-10 hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonialsData.length)}
                className="absolute top-1/2 -right-2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a24] shadow-lg border border-black/5 dark:border-white/10 text-primary z-10 hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Grid en Desktop */}
            <div className="hidden md:grid gap-6 md:grid-cols-3">
              {testimonialsData.map((t, idx) => (
                <motion.div key={idx} variants={fadeUpVariant} whileHover={{ y: -5 }} className="rounded-3xl bg-white dark:bg-[#1a1a24] p-8 shadow-xl border border-black/5 dark:border-white/10 text-left">
                  <div className="mb-4 text-primary font-bold tracking-widest text-lg">★★★★★</div>
                  <p className="mb-6 italic text-slate-600 dark:text-slate-400 text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-4 border-t border-black/5 dark:border-white/10 pt-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black shrink-0">{t.init}</div>
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contacto - Stacked en móvil */}
        <section className="px-6 py-20 lg:px-10" id="contacto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div variants={fadeUpVariant} className="flex flex-col gap-8 text-center lg:text-left">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl">Visítanos</h2>
                <div className="space-y-4">
                  {[
                    { img: "/Imagenes/ubicacion.png", title: "Ubicación", desc: "Calle 123, Barrio 1, Bogotá" },
                    { img: "/Imagenes/reloj.png", title: "Horarios", desc: "Lun - Vie: 10am - 8pm" },
                    { img: "/Imagenes/telefono.png", title: "Contacto", desc: "+57 XXX-XXX-XXXX" }
                  ].map((item, i) => (
                    <motion.div key={i} whileHover={{ x: 10 }} className="flex items-start gap-4 text-left rounded-2xl p-4 bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 transition-all">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <img src={item.img} alt={item.title} className="w-5 h-5 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={scaleUpVariant} className="h-[300px] sm:h-[400px] overflow-hidden rounded-[32px] bg-slate-200 shadow-2xl border-4 border-white dark:border-white/10 relative group">
                <div className="absolute inset-0 grayscale opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('/Imagenes/fondobt.png')" }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-6 bg-white dark:bg-[#1a1a24] rounded-2xl shadow-2xl text-center border border-black/5 dark:border-white/10 mx-4">
                    <img src="/Imagenes/ubicacion.png" alt="Ubicación" className="w-8 h-8 object-contain mx-auto mb-2" />
                    <h5 className="font-bold">BarberTech</h5>
                    <button className="text-primary text-xs font-bold hover:underline mt-4">Ver en Google Maps</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer - Adaptado */}
      <footer className="border-t border-black/5 dark:border-white/5 bg-slate-100 px-6 py-12 dark:bg-[#0a0a0f] transition-colors mt-auto">
        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-3 text-center md:text-left">
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">Barber<span className="text-primary">Tech</span></h1>
            <p className="text-xs text-slate-500 mt-4">Definiendo el estilo masculino.</p>
          </div>
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wider text-[10px] opacity-50">Legal</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">Términos</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wider text-[10px] opacity-50">Síguenos</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {["facebook", "instagram", "twitter"].map((social) => (
                <motion.a key={social} whileHover={{ y: -5 }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/10" href="#">
                  <img src={`/Imagenes/${social}.${social === 'twitter' ? 'webp' : 'png'}`} alt={social} className="w-5 h-5 object-contain" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 text-center text-[10px] text-slate-500 uppercase tracking-widest opacity-60">
          © 2026 BarberTech.
        </div>
      </footer>
    </div>
  );
}