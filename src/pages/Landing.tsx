import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import "../index.css";

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(true);
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

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const, bounce: 0.4 } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const scaleUpVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring" as const, bounce: 0.4 } }
  };
  const navStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const dropDownVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120 } }
  };

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased overflow-x-hidden transition-colors duration-300 flex flex-col">

      {/* Estilos botón cambiar modo claro/oscuro */}
      <style>{`
        .btn-flip {
          width: 44px;
          height: 44px;
          position: relative;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 0;
          outline: none;
        }
        .btn-flip-front, .btn-flip-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.5s;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.05);
        }
        .dark .btn-flip-front, .dark .btn-flip-back {
          box-shadow: 0px 4px 10px rgba(255,255,255,0.05);
        }
        .btn-flip-front {
          background: #F3F6F8; 
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }
        .dark .btn-flip-front {
          background: #1e293b; 
        }
        .btn-flip-back {
          background: #1e293b;
          opacity: 0;
          transform: translateY(-50%) rotateX(90deg);
        }
        .dark .btn-flip-back {
          background: #F3F6F8;
        }
        .btn-flip:hover .btn-flip-front {
          opacity: 0;
          transform: translateY(50%) rotateX(90deg);
        }
        .btn-flip:hover .btn-flip-back {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }
      `}</style>

      {/* Navbar (barrita superior) */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 backdrop-blur-md dark:bg-background-dark/80 transition-colors duration-300">


        {/* Logo y Texto */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <motion.div variants={dropDownVariant} initial="hidden" animate="visible" className="flex items-center gap-3"  >
            <motion.img src="/Imagenes/Recurso 1.png" alt="BarberTech Logo" className="w-16 h-16 object-contain drop-shadow-lg" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} whileHover={{ rotate: 180, scale: 1.15 }} />
            <motion.h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 ml-2" animate={{ scale: [1, 1.02, 1], textShadow: ["0px 0px 4px transparent", "0px 0px 8px rgba(0, 123, 255, 0.4)", "0px 0px 4px transparent"] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} >
              BarberTech
            </motion.h1>
          </motion.div>
          <motion.nav
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8" >

            {[{ href: "#inicio", name: "Inicio" },
            { href: "#servicios", name: "Servicios" },
            { href: "#galeria", name: "Galería" },
            { href: "#testimonios", name: "Testimonios" },
            { href: "#contacto", name: "Contacto" }].map((link, idx) => (
              <motion.a key={idx} variants={dropDownVariant} whileHover={{ scale: 1.15, y: -4, rotate: (idx % 2 === 0 ? 3 : -3), textShadow: "0px 4px 15px rgba(0, 123, 255, 0.6)" }} whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-primary dark:hover:text-primary transition-colors relative group pb-1" href={link.href} >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
              </motion.a>
            ))}
          </motion.nav>
          <motion.div
            variants={dropDownVariant}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <motion.div>
              <button className="btn-flip" onClick={toggleTheme} aria-label="Alternar tema">
                {/* Cara frontal */}
                <div className="btn-flip-front">
                  {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E5D78" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  )}
                </div>
                {/* Cara trasera */}
                <div className="btn-flip-back">
                  {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E5D78" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                  )}
                </div>
              </button>
            </motion.div>
            <motion.button
              animate={{
                y: [0, -4, 0],
                boxShadow: ["0px 4px 10px rgba(0,123,255,0.2)", "0px 10px 25px rgba(0,123,255,0.6)", "0px 4px 10px rgba(0,123,255,0.2)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, y: -4, boxShadow: "0px 0px 30px var(--color-primary)", backgroundColor: "#5213fc" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReservation}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-[#5213fc] transition-all"
            >
              Reservar Cita
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow">

        {/* Inicio */}
        <section className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24" id="inicio">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col gap-8">
                <motion.div variants={fadeUpVariant} className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-primary text-xs font-bold uppercase tracking-wider">
                  <span>La mejor experiencia en barbería</span>
                </motion.div>
                <motion.h1 variants={fadeUpVariant} className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl">
                  Corte y Estilo con <span className="text-primary">Personalidad</span>
                </motion.h1>
                <motion.p variants={fadeUpVariant} className="text-lg text-slate-600 dark:text-slate-400">
                  Tu mejor versión comienza aquí. Experiencia de barbería clásica apoyada con tecnología para hacer tu visita más rápida y cómoda.
                </motion.p>
                <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleReservation} className="rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform flex items-center gap-2 group">
                    Reservar Cita Ahora
                  </motion.button>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#servicios" className="rounded-xl border border-primary/20 bg-white dark:bg-background-dark px-8 py-4 text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-flex items-center justify-center">
                    Ver Servicios
                  </motion.a>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                <div className="aspect-[4/5] w-full rounded-2xl bg-slate-200 bg-cover bg-center shadow-2xl transition-transform hover:scale-105 duration-700" data-alt="Barbero profesional" style={{ backgroundImage: 'url("/Imagenes/barbero1.png")' }}></div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }} animate={{ y: [0, -10, 0] }} className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-white dark:bg-background-dark p-6 shadow-xl border border-slate-100 dark:border-primary/20" style={{ animation: "float 6s ease-in-out infinite" }} >
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

        {/* Servicios */}
        <section className="bg-white dark:bg-background-dark px-6 py-20 lg:px-10 border-y border-slate-200 dark:border-primary/10 transition-colors duration-300" id="servicios">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <motion.h2 variants={fadeUpVariant} className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl">Nuestros Servicios</motion.h2>
              <motion.div variants={fadeUpVariant} className="mt-4 flex justify-center">
                <div className="h-1.5 w-20 rounded-full bg-primary"></div>
              </motion.div>
              <motion.p variants={fadeUpVariant} className="mt-6 text-slate-600 dark:text-slate-400">Ofrecemos una gama completa de servicios de cuidado personal para el hombre moderno.</motion.p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <motion.div variants={fadeUpVariant} whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="flex flex-col rounded-2xl border border-primary/5 bg-background-light p-8 transition-all hover:shadow-xl hover:border-primary dark:bg-background-dark dark:border-white/5 group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                  <img src="/Imagenes/cortecabello.png" alt="Corte" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Corte de Cabello</h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">Cortes clásicos y de tendencia adaptados a la forma de tu rostro y estilo personal.</p>
                <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-6">
                  <span className="font-bold text-primary">Desde $25</span>
                  <span className="text-sm text-slate-500">45 min</span>
                </div>
              </motion.div>

              <motion.div variants={fadeUpVariant} whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="flex flex-col rounded-2xl border border-primary/5 bg-background-light p-8 transition-all hover:shadow-xl hover:border-primary dark:bg-background-dark dark:border-white/5 group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                  <img src="/Imagenes/barba.png" alt="Barba" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Arreglo de Barba</h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">Perfilado preciso, recorte y tratamiento de hidratación para una barba impecable.</p>
                <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-6">
                  <span className="font-bold text-primary">Desde $15</span>
                  <span className="text-sm text-slate-500">30 min</span>
                </div>
              </motion.div>

              <motion.div variants={fadeUpVariant} whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="flex flex-col rounded-2xl border border-primary/5 bg-background-light p-8 transition-all hover:shadow-xl hover:border-primary dark:bg-background-dark dark:border-white/5 group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                  <img src="/Imagenes/tratamiento.png" alt="Facial" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Tratamiento Facial</h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">Limpieza profunda, exfoliación y masaje para revitalizar tu piel y relajarte.</p>
                <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-6">
                  <span className="font-bold text-primary">Desde $20</span>
                  <span className="text-sm text-slate-500">40 min</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Galeria */}
        <section className="px-6 py-20 lg:px-10" id="galeria">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <motion.div variants={fadeUpVariant}>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl text-3xl">Galería de Estilos</h2>
                <p className="mt-6 text-slate-600 dark:text-slate-400 mt-4">Echa un vistazo a algunos de nuestros trabajos recientes.</p>
              </motion.div>
              <motion.button variants={fadeUpVariant} className="text-sm font-bold text-primary flex items-center gap-2 hover:underline">
                Ver Instagram
              </motion.button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
              {[
                "/Imagenes/corte1.jpg",
                "/Imagenes/corte2.jpg",
                "/Imagenes/corte3.jpg",
                "/Imagenes/corte4.avif"
              ].map((src, i) => (
                <motion.div key={i} variants={scaleUpVariant} whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2, zIndex: 10 }} transition={{ type: "spring", stiffness: 300 }} className="aspect-square overflow-hidden rounded-xl bg-slate-200">
                  <img className="h-full w-full object-cover transition-transform hover:scale-110 duration-500" data-alt={`Galeria ${i}`} src={src} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonios (comentarios de usuarios falsos) */}
        <section className="bg-primary/5 px-6 py-20 lg:px-10 transition-colors duration-300" id="testimonios">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mx-auto max-w-7xl">
            <motion.h2 variants={fadeUpVariant} className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl text-center mb-16">
              Lo que dicen nuestros clientes
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { init: "CM", name: "Carlos Méndez", date: "Cliente desde 2022", text: "La mejor barbería de la ciudad. El ambiente es increíble y siempre salgo con un corte perfecto. La atención al detalle es insuperable." },
                { init: "RG", name: "Roberto García", date: "Cliente frecuente", text: "El servicio de arreglo de barba es otro nivel. Utilizan productos de alta calidad y se nota la experiencia de los barberos." },
                { init: "JP", name: "Juan Pérez", date: "Cliente nuevo", text: "Moderno, limpio y muy profesional. Reservar cita es super sencillo. Altamente recomendado para cualquiera que busque estilo." }
              ].map((t, idx) => (
                <motion.div key={idx} variants={fadeUpVariant} whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }} transition={{ type: "spring", stiffness: 300 }} className="rounded-2xl bg-white dark:bg-background-dark dark:border-white/5 p-8 shadow-sm border border-slate-100">
                  <div className="mb-4 flex gap-1 items-center text-primary font-bold">
                    ★★★★★
                  </div>
                  <p className="mb-6 italic text-slate-600 dark:text-slate-400">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-primary/20 flex items-center justify-center text-primary font-bold">{t.init}</div>
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contacto */}
        <section className="px-6 py-20 lg:px-10" id="contacto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div variants={fadeUpVariant} className="flex flex-col gap-8">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl">Visítanos</h2>
                <div className="space-y-6">
                  <motion.div whileHover={{ x: 10, backgroundColor: "var(--color-surface-hover)" }} transition={{ type: "spring", stiffness: 300 }} className="flex items-start gap-4 rounded-lg p-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <img src="/Imagenes/ubicacion.png" alt="Ubicación" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold">Ubicación</h4>
                      <p className="text-slate-600 dark:text-slate-400">Calle 123, Barrio 1<br />Colombia, Bogotá</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 10, backgroundColor: "var(--color-surface-hover)" }} transition={{ type: "spring", stiffness: 300 }} className="flex items-start gap-4 rounded-lg p-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <img src="/Imagenes/reloj.png" alt="Horarios" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold">Horarios</h4>
                      <p className="text-slate-600 dark:text-slate-400">Lunes - Viernes: 10:00 AM - 8:00 PM<br />Sábados: 9:00 AM - 6:00 PM<br />Domingos: Cerrado</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 10, backgroundColor: "var(--color-surface-hover)" }} transition={{ type: "spring", stiffness: 300 }} className="flex items-start gap-4 rounded-lg p-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <img src="/Imagenes/telefono.png" alt="Contacto" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold">Contacto</h4>
                      <p className="text-slate-600 dark:text-slate-400">+57 XXX-XXX-XXXX <br /> ejemplo@barbertech.com</p>
                    </div>
                  </motion.div>
                </div>
                <button className="mt-4 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 w-fit">¿Cómo llegar?</button>
              </motion.div>

              <motion.div variants={scaleUpVariant} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="h-[400px] overflow-hidden rounded-2xl bg-slate-200 shadow-xl border border-slate-100 dark:border-primary/20 relative">
                <div className="absolute inset-0 grayscale opacity-60 dark:opacity-30 bg-cover bg-center" data-location="Mexico City" style={{ backgroundImage: "url('/Imagenes/fondobt.png')" }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-6 bg-white dark:bg-background-dark rounded-xl shadow-2xl text-center border border-slate-100 dark:border-primary/20 flex flex-col items-center">
                    <div className="mb-2">
                      <img src="/Imagenes/ubicacion.png" alt="Ubicación" className="w-8 h-8 object-contain" />
                    </div>
                    <h5 className="font-bold">BarberTech</h5>
                    <button className="text-primary text-sm font-bold flex items-center gap-1 mx-auto hover:underline mt-4">
                      Ver en Google Maps
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer (incluye la parte de las redes y así)*/}
      <footer className="border-t border-primary/10 bg-slate-100 px-6 py-12 dark:bg-background-dark lg:px-10 transition-colors duration-300 mt-auto">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
            <div>
              <div className="footer-logo-container">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">BarberTech</h1>
              </div>
              <p className="text-sm text-slate-500">Definiendo el estilo masculino. <br /> Calidad, precisión y confort en cada servicio.</p>
            </div>
            <div>
              <h4 className="mb-6 font-bold uppercase tracking-wider text-xs">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-primary" href="#">Términos de Servicio</a></li>
                <li><a className="hover:text-primary" href="#">Política de Privacidad</a></li>
                <li><a className="hover:text-primary" href="#">Política de Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-bold uppercase tracking-wider text-xs">Síguenos</h4>
              <div className="flex gap-4">
                <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-primary hover:text-white transition-colors dark:bg-slate-800 dark:hover:bg-[#5213fc]" href="#">
                  <img src="/Imagenes/facebook.png" alt="Facebook" className="w-5 h-5 object-contain" />
                </motion.a>
                <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-primary hover:text-white transition-colors dark:bg-slate-800 dark:hover:bg-[#5213fc]" href="#">
                  <img src="/Imagenes/instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                </motion.a>
                <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-primary hover:text-white transition-colors dark:bg-slate-800 dark:hover:bg-[#5213fc]" href="#">
                  <img src="/Imagenes/twitter.webp" alt="Twitter" className="w-5 h-5 object-contain" />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-primary/5 pt-8 text-center text-sm text-slate-500">
            <p>© 2026 BarberTech. Todos los derechos reservados. Diseñado con pasión.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
