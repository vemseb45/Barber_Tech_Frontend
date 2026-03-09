import "./css/Landing.css";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
    {/* Barra de navegación */}
      <Navbar />

      <section className="logo1">
        <div className="logo2">
          <img src="/Imagenes/Recurso 1.png"  alt="Barber Tech Logo"  className="logo" />
        </div>
      </section>

      <section className="barberias1" id="barberia">
        <div className="TituloInicio">
          <h1> Tu estilo, a un clic de distancia, BarberTech tu mejor opción! </h1>
        </div>

        <div className="containerInicio">
          <div className="TextoInicio">
            <p> Encuentra tu barbero ideal, explora nuestros servicios y reserva tu cita cómodamente desde casa.
            <br /> ¡Prepárate para lucir tu mejor versión! </p>
          </div>

          <div className="ImagenInicio">
            <img src="/Imagenes/Salon Barberia.jpg" alt="Barbería" />
          </div>
        </div>
      </section>

    {/* Slider Barberias */}
      <Slider />

      <section className="recomendaciones" id="recomendaciones">
        <div className="TituloRecom">
          <h1> Recomendaciones </h1>
        </div>

        <div className="containerRecom">
          <div className="TextoRecom">
            <h3>Navega y descubre tu estilo</h3>
            <p>Explora nuestro catálogo de servicios y conoce a nuestros barberos desde la comodidad de tu dispositivo. </p>
            <br />

            <h3>Elige tu Barbero y Servicio Ideal</h3>
            <p>Dentro de la aplicación, podrás ver sus perfiles, su disponibilidad y los servicios que ofrecen. </p>
            <br />

            <h3>Agenda, Confirma y Disfruta</h3>
            <p>Elige la fecha y hora que mejor te convenga, confirma tu reserva y la aplicación se encargará del resto. </p>

          </div>
          
          <div className="ImagenRecom">
            <img src="/Imagenes/recom.jpg" alt="Recomendaciones" />
          </div>
        </div>

      </section>

      <section className="bigotito">
        <img src="/Imagenes/bigotito.png" alt="Bigotito" />
      </section>

    {/* Footer (pie pag) */}
      <Footer />
    </>
  );
}