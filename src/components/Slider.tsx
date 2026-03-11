import { useEffect } from "react";

export default function Slider() {

  useEffect(() => {

    let current = 1;

    const interval = setInterval(() => {

      const radio = document.getElementById(`slide${current}`) as HTMLInputElement;

      if (radio) {
        radio.checked = true;
      }

      current++;

      if (current > 3) {
        current = 1;
      }

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
    <section className="sliders" id="barberias">
      <div className="slider">
        <h1>Nuestras barberías</h1>

        <input type="radio" name="radio-btn" id="slide1" defaultChecked />
        <input type="radio" name="radio-btn" id="slide2" />
        <input type="radio" name="radio-btn" id="slide3" />

        <div className="slides">

          <div className="slide">
            <img src="/Imagenes/Barberia1.jpg" alt="Barbería 1" />
            <div className="TextoSlider">
              <h2>Barbería los 3 niches</h2>
              <p>
                Tu lugar para un corte impecable y afeitado clásico.
              </p>
              <a href="#">Visitar</a>
            </div>
          </div>

          <div className="slide">
            <img src="/Imagenes/Barberia2.jpeg" alt="Barbería 2" />
            <div className="TextoSlider">
              <h2>Barbería El Estilo</h2>
              <p>
                Disfruta de un ambiente moderno con barberos expertos.
              </p>
              <a href="#">Visitar</a>
            </div>
          </div>

          <div className="slide">
            <img src="/Imagenes/Barberia3.webp" alt="Barbería 3" />
            <div className="TextoSlider">
              <h2>Barbería Tradición</h2>
              <p>
                Técnicas clásicas con un servicio único.
              </p>
              <a href="#">Visitar</a>
            </div>
          </div>

        </div>

        <div className="controls">
          <label className="botonesNav anterior prev-1" htmlFor="slide3">‹‹</label>
          <label className="botonesNav siguiente next-1" htmlFor="slide2">››</label>

          <label className="botonesNav anterior prev-2" htmlFor="slide1">‹‹</label>
          <label className="botonesNav siguiente next-2" htmlFor="slide3">››</label>

          <label className="botonesNav anterior prev-3" htmlFor="slide2">‹‹</label>
          <label className="botonesNav siguiente next-3" htmlFor="slide1">››</label>
        </div>

        <div className="navegSlider">
          <label htmlFor="slide1"></label>
          <label htmlFor="slide2"></label>
          <label htmlFor="slide3"></label>
        </div>

      </div>
    </section>
  );
}