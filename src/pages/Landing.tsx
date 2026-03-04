import "./css/Landing.css";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="logo1">
        <div className="logo2">
          <img
            src="/Imagenes/Recurso 1.png"
            alt="Barber Tech Logo"
            className="logo"
          />
        </div>
      </section>

      <section className="barberias1" id="barberia">
        <div className="TituloInicio">
          <h1>
            Tu estilo, a un clic de distancia, BarberTech tu mejor opción
          </h1>
        </div>

        <div className="containerInicio">
          <div className="TextoInicio">
            <p>
              Encuentra tu barbero ideal, explora nuestros servicios y reserva
              tu cita cómodamente desde casa.
              <br /> ¡Prepárate para lucir tu mejor versión!
            </p>
          </div>

          <div className="ImagenInicio">
            <img
              src="/Imagenes/Salon Barberia.jpg"
              alt="Barbería"
            />
          </div>
        </div>
      </section>

      <Slider />

      <section className="recomendaciones" id="recomendaciones">
        <div className="TituloRecom">
          <h1>
            Tu estilo, a un clic de distancia, BarberTech tu mejor opción
          </h1>
        </div>

        <div className="containerRecom">
          <div className="TextoRecom">
            <p>
              Encuentra tu barbero ideal, explora nuestros servicios y reserva
              tu cita cómodamente desde casa.
              <br /> ¡Prepárate para lucir tu mejor versión!
            </p>
          </div>

          <div className="ImagenRecom">
            <img src="/Imagenes/recom.jpg" alt="Recomendaciones" />
          </div>
        </div>
      </section>

      <section className="bigotito">
        <img src="/Imagenes/bigotito.png" alt="Bigotito" />
      </section>

      <Footer />
    </>
  );
}