import "./css/Landing.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

export default function Home() {

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, { threshold: 0.2 });

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <>
      {/* Barra de navegación */}
      <Navbar />

      <section className="logo1">
        <div className="hero-content animate-on-scroll">
          
          <img src="/Imagenes/Recurso 1.png" alt="Barber Tech Logo" className="logo" />

          <h1 className="hero-title">Tu estilo, a un clic de distancia</h1>

          <p className="hero-sub">
            Encuentra tu barbero ideal, explora servicios y reserva tu cita en segundos.
          </p>

        </div>
      </section>

      <section className="barberias1 animate-on-scroll" id="barberia">

        <div className="TituloInicio">
          <h1>Descubre barberías cerca de ti</h1>
        </div>

        <div className="containerInicio">

          <div className="ImagenInicio">
            <img src="/Imagenes/Salon Barberia.jpg" alt="Barbería" />
          </div>

          <div className="TextoInicio">
            <p>
              Encuentra tu barbero ideal, explora nuestros servicios y reserva tu cita cómodamente desde casa.
              <br /><br />
              BarberTech conecta clientes con las mejores barberías para que siempre luzcas tu mejor versión.
            </p>
          </div>

        </div>
      </section>


      {/* Slider Barberias */}
      <Slider />

      <section className="recomendaciones animate-on-scroll" id="recomendaciones">

        <div className="TituloRecom">
          <h1>Cómo funciona BarberTech</h1>
        </div>

        <div className="containerRecom">

          <div className="TextoRecom">

            <div className="recom-card">
              <h3>Navega y descubre tu estilo</h3>
              <p>Explora nuestro catálogo de servicios y conoce a nuestros barberos.</p>
            </div>

            <div className="recom-card">
              <h3>Elige tu barbero ideal</h3>
              <p>Consulta perfiles, disponibilidad y los servicios disponibles.</p>
            </div>

            <div className="recom-card">
              <h3>Agenda y confirma</h3>
              <p>Selecciona fecha y hora y reserva tu cita fácilmente.</p>
            </div>

          </div>

          <div className="ImagenRecom">
            <img src="/Imagenes/recom.jpg" alt="Recomendaciones" />
          </div>

        </div>

      </section>

{/* Servicios */}
      <section className="servicios" id="servicios">

        <div className="servicios-header animate-on-scroll">
          <h1>Nuestros Servicios</h1>
          <p> BarberTech conecta clientes con barberos profesionales para que encuentres tu estilo perfecto de forma rápida y sencilla. </p>
        </div>

        <div className="servicios-container">

          <div className="servicio-card animate-on-scroll">
            <img src="/Imagenes/Tijeras.webp" className="servicio-icon-img" />
            <h2>Corte Profesional</h2>
            <p>Barberos expertos listos para crear tu estilo ideal.</p>
          </div>

          <div className="servicio-card animate-on-scroll">
            <img src="/Imagenes/reservas.png" className="servicio-icon-img" />
            <h2>Reserva Online</h2>
            <p>Agenda tu cita en segundos desde cualquier lugar.</p>
          </div>

          <div className="servicio-card animate-on-scroll">
            <img src="/Imagenes/top.webp" className="servicio-icon-img" />
            <h2>Barberías Top</h2>
            <p>Descubre las barberías mejor calificadas cerca de ti.</p>
          </div>

          <div className="servicio-card animate-on-scroll">
            <img src="/Imagenes/premium.png" className="servicio-icon-img" />
            <h2>Servicios Premium</h2>
            <p>Cortes, barba, tratamientos y más.</p>
          </div>

        </div>

      </section>

{/* Bigote Final */}
      <section className="bigotito">
        <img src="/Imagenes/bigotito.png" alt="Bigotito" />
      </section>


      {/* Footer (pie pag) */}
      <Footer />
    </>
  );
}