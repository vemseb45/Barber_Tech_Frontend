import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import "../index.css";

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );
  const navigate = useNavigate();
  const hasSession = false;

  const handleReservation = () => {
    if (hasSession) {
      navigate('/dashboard');
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
    <div className="landing-page">
      
      {/* Botón para cambiar de tema claro/oscuro */}
      <div className="btn-flip-container">
        <button className="btn-flip" onClick={toggleTheme}>
          {/* Cara frontal */}
          <div className="btn-flip-front">
             {isDarkMode ? (
                <img src="../public/Imagenes/luna.png" alt="Oscuro" className="w-6 h-6 object-contain" />
             ) : (
                <img src="/Imagenes/sol.png"  alt="Claro" className="w-6 h-6 object-contain" />
             )}
          </div>
          {/* Cara trasera */}
          <div className="btn-flip-back">
             {isDarkMode ? (
                <img src="/Imagenes/sol.png" alt="Cambiar a Claro" className="w-6 h-6 object-contain" />
             ) : (
                <img src="/Imagenes/luna.png" alt="Cambiar a Oscuro" className="w-6 h-6 object-contain" />
             )}
          </div>
        </button>
      </div>

      {/* Navbar (barrita superior) */}
      <header className="landing-header">


        {/* Logo y Texto */}
        <div className="header-container">
          <motion.div   variants={dropDownVariant} initial="hidden" animate="visible" className="logo-container"  >
            <motion.img   src="/Imagenes/Recurso 1.png"  alt="BarberTech Logo"  className="w-16 h-16 object-contain drop-shadow-lg"  animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} whileHover={{ rotate: 180, scale: 1.15 }} />
            <motion.h1 className="logo-text ml-2" animate={{  scale: [1, 1.02, 1],textShadow: ["0px 0px 4px transparent", "0px 0px 8px rgba(0, 123, 255, 0.4)", "0px 0px 4px transparent"] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} >
               BarberTech
            </motion.h1>
          </motion.div>
          <motion.nav 
            variants={{  hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }} 
            initial="hidden" 
            animate="visible" 
            className="nav-links" >

            {[{ href: "#inicio", name: "Inicio" }, 
            { href: "#servicios", name: "Servicios" }, 
            { href: "#galeria", name: "Galería" }, 
            { href: "#testimonios", name: "Testimonios" }, 
            { href: "#contacto", name: "Contacto" }].map((link, idx) => (
              <motion.a key={idx} variants={dropDownVariant} whileHover={{ scale: 1.15, y: -4, rotate: (idx % 2 === 0 ? 3 : -3), color: "var(--color-primary)", textShadow: "0px 4px 15px rgba(0, 123, 255, 0.6)" }} whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="nav-item relative group pb-1" href={link.href} >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
              </motion.a>
            ))}
          </motion.nav>
          <motion.div
             variants={dropDownVariant}
             initial="hidden"
             animate="visible"
          >
            <motion.button  
              animate={{ 
                 y: [0, -4, 0],
                 boxShadow: ["0px 4px 10px rgba(0,123,255,0.2)", "0px 10px 25px rgba(0,123,255,0.6)", "0px 4px 10px rgba(0,123,255,0.2)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, y: -4, boxShadow: "0px 0px 30px var(--color-primary)", backgroundColor: "#5213fc" }} 
              whileTap={{ scale: 0.9 }} 
              onClick={handleReservation} 
              className="btn-primary" 
            >
              Reservar Cita
            </motion.button>
          </motion.div>
        </div>
      </header>
      
      {/* Contenido Principal */}
      <main className="flex-grow">
        
        {/* Inicio */}
        <section className="hero-section" id="inicio">
          <div className="section-container">
            <div className="hero-grid">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="hero-content">
                <motion.div variants={fadeUpVariant} className="hero-badge">
                  <span>La mejor experiencia en barbería</span>
                </motion.div>
                <motion.h1 variants={fadeUpVariant} className="hero-title">
                  Corte y Estilo con <span className="text-primary">Personalidad</span>
                </motion.h1>
                <motion.p variants={fadeUpVariant} className="hero-text">
                  Tu mejor versión comienza aquí. Experiencia de barbería clásica apoyada con tecnología para hacer tu visita más rápida y cómoda.
                </motion.p>
                <motion.div variants={fadeUpVariant} className="hero-buttons">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleReservation} className="btn-hero-primary group">
                    Reservar Cita Ahora
                  </motion.button>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#servicios" className="btn-hero-secondary inline-flex items-center justify-center">
                    Ver Servicios
                  </motion.a>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                <div className="hero-image-container" data-alt="Barbero profesional" style={{ backgroundImage: 'url("/Imagenes/barbero1.png")' }}></div>
                <motion.div  initial={{ opacity: 0, y: 20 }}  whileInView={{ opacity: 1, y: 0 }}  viewport={{ once: true }}  transition={{ delay: 0.5, duration: 0.5 }}  animate={{ y: [0, -10, 0] }} className="hero-floating-card"style={{ animation: "float 6s ease-in-out infinite" }} >
                  <div className="flex items-center gap-4">
                    <div className="avatar-group">
                      <div className="avatar bg-slate-300"></div>
                      <div className="avatar bg-slate-400"></div>
                      <div className="avatar-count">+5k</div>
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
        <section className="services-section" id="servicios">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="section-container">
            <div className="section-title-container">
              <motion.h2 variants={fadeUpVariant} className="section-title">Nuestros Servicios</motion.h2>
              <motion.div variants={fadeUpVariant} className="section-divider">
                <div className="section-divider-line"></div>
              </motion.div>
              <motion.p variants={fadeUpVariant} className="section-subtitle">Ofrecemos una gama completa de servicios de cuidado personal para el hombre moderno.</motion.p>
            </div>
            
            <div className="services-grid">
              <motion.div variants={fadeUpVariant} whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="service-card group">
                <div className="service-icon-bg">
                  <img src="/Imagenes/cortecabello.png" alt="Corte" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="service-title">Corte de Cabello</h3>
                <p className="service-text">Cortes clásicos y de tendencia adaptados a la forma de tu rostro y estilo personal.</p>
                <div className="service-footer">
                  <span className="service-price">Desde $25</span>
                  <span className="service-time">45 min</span>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUpVariant} whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="service-card group">
                <div className="service-icon-bg">
                  <img src="/Imagenes/barba.png" alt="Barba" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="service-title">Arreglo de Barba</h3>
                <p className="service-text">Perfilado preciso, recorte y tratamiento de hidratación para una barba impecable.</p>
                <div className="service-footer">
                  <span className="service-price">Desde $15</span>
                  <span className="service-time">30 min</span>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUpVariant} whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="service-card group">
                <div className="service-icon-bg">
                  <img src="/Imagenes/tratamiento.png" alt="Facial" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="service-title">Tratamiento Facial</h3>
                <p className="service-text">Limpieza profunda, exfoliación y masaje para revitalizar tu piel y relajarte.</p>
                <div className="service-footer">
                  <span className="service-price">Desde $20</span>
                  <span className="service-time">40 min</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Galeria */}
        <section className="gallery-section" id="galeria">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="section-container">
            <div className="gallery-header">
              <motion.div variants={fadeUpVariant}>
                <h2 className="section-title text-3xl">Galería de Estilos</h2>
                <p className="section-subtitle mt-4">Echa un vistazo a algunos de nuestros trabajos recientes.</p>
              </motion.div>
              <motion.button variants={fadeUpVariant} className="gallery-link">
                Ver Instagram
              </motion.button>
            </div>
            <div className="gallery-grid">
              {[
                "/Imagenes/corte1.jpg",
                "/Imagenes/corte2.jpg",
                "/Imagenes/corte3.jpg",
                "/Imagenes/corte4.avif"
              ].map((src, i) => (
                <motion.div key={i} variants={scaleUpVariant} whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2, zIndex: 10 }} transition={{ type: "spring", stiffness: 300 }} className="gallery-item">
                  <img className="gallery-image" data-alt={`Galeria ${i}`} src={src} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonios (comentarios de usuarios falsos) */}
        <section className="testimonials-section" id="testimonios">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="section-container">
            <motion.h2 variants={fadeUpVariant} className="section-title text-center mb-16">
              Lo que dicen nuestros clientes
            </motion.h2>
            <div className="testimonials-grid">
              {[
                { init: "CM", name: "Carlos Méndez", date: "Cliente desde 2022", text: "La mejor barbería de la ciudad. El ambiente es increíble y siempre salgo con un corte perfecto. La atención al detalle es insuperable." },
                { init: "RG", name: "Roberto García", date: "Cliente frecuente", text: "El servicio de arreglo de barba es otro nivel. Utilizan productos de alta calidad y se nota la experiencia de los barberos." },
                { init: "JP", name: "Juan Pérez", date: "Cliente nuevo", text: "Moderno, limpio y muy profesional. Reservar cita es super sencillo. Altamente recomendado para cualquiera que busque estilo." }
              ].map((t, idx) => (
                <motion.div key={idx} variants={fadeUpVariant} whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }} transition={{ type: "spring", stiffness: 300 }} className="testimonial-card">
                  <div className="testimonial-stars text-primary font-bold">
                     ★★★★★
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author-container">
                    <div className="testimonial-avatar">{t.init}</div>
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
        <section className="contact-section" id="contacto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="section-container">
            <div className="contact-grid">
              <motion.div variants={fadeUpVariant} className="flex flex-col gap-8">
                <h2 className="section-title">Visítanos</h2>
                <div className="contact-info-list">
                  <motion.div whileHover={{ x: 10, backgroundColor: "var(--color-surface-hover)" }} transition={{ type: "spring", stiffness: 300 }} className="contact-item rounded-lg p-2">
                    <div className="contact-icon-bg">
                      <img src="/Imagenes/ubicacion.png" alt="Ubicación" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <h4 className="contact-item-title">Ubicación</h4>
                      <p className="contact-item-text">Calle 123, Barrio 1<br />Colombia, Bogotá</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 10, backgroundColor: "var(--color-surface-hover)" }} transition={{ type: "spring", stiffness: 300 }} className="contact-item rounded-lg p-2">
                    <div className="contact-icon-bg">
                       <img src="/Imagenes/reloj.png" alt="Horarios" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <h4 className="contact-item-title">Horarios</h4>
                      <p className="contact-item-text">Lunes - Viernes: 10:00 AM - 8:00 PM<br />Sábados: 9:00 AM - 6:00 PM<br />Domingos: Cerrado</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 10, backgroundColor: "var(--color-surface-hover)" }} transition={{ type: "spring", stiffness: 300 }} className="contact-item rounded-lg p-2">
                    <div className="contact-icon-bg">
                       <img src="/Imagenes/telefono.png" alt="Contacto" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <h4 className="contact-item-title">Contacto</h4>
                      <p className="contact-item-text">+57 XXX-XXX-XXXX <br /> ejemplo@barbertech.com</p>
                    </div>
                  </motion.div>
                </div>
                <button className="btn-contact">¿Cómo llegar?</button>
              </motion.div>

              <motion.div variants={scaleUpVariant} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="map-container">
                <div className="map-bg" data-location="Mexico City" style={{ backgroundImage: "url('/Imagenes/fondobt.png')" }}></div>
                <div className="map-overlay">
                  <div className="map-card">
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
      <footer className="landing-footer">
        <div className="section-container">
          <div className="footer-grid grid-cols-1 md:grid-cols-3">
            <div>
              <div className="footer-logo-container">
                <h1 className="logo-text">BarberTech</h1>
              </div>
              <p className="footer-text">Definiendo el estilo masculino. <br /> Calidad, precisión y confort en cada servicio.</p>
            </div>
            <div>
              <h4 className="footer-title">Legal</h4>
              <ul className="footer-links">
                <li><a className="hover:text-primary" href="#">Términos de Servicio</a></li>
                <li><a className="hover:text-primary" href="#">Política de Privacidad</a></li>
                <li><a className="hover:text-primary" href="#">Política de Cookies</a></li>
              </ul>
            </div>
            <div>
                <h4 className="footer-title">Síguenos</h4>
                <div className="footer-socials">
                  <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300 }} className="social-icon" href="#">
                    <img src="/Imagenes/facebook.png" alt="Facebook" className="w-5 h-5 object-contain" />
                  </motion.a>
                  <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300 }} className="social-icon" href="#">
                    <img src="/Imagenes/instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                  </motion.a>
                  <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300 }} className="social-icon" href="#">
                    <img src="/Imagenes/twitter.webp" alt="Twitter" className="w-5 h-5 object-contain" />
                  </motion.a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 BarberTech. Todos los derechos reservados. Diseñado con pasión.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
