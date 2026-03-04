import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faTiktok, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    
    <section className="footer">
      <footer className="piepagina" id="contacto">

        {/* Columna 1 */}
        <div className="footerTexto">
          <h3>Contáctenos</h3>
        </div>

        <div className="columna">
          <div className="item-contacto">
            <FontAwesomeIcon icon={faWhatsapp} />
            <span>+57 XXX-XXX-XXXX</span>
          </div>

          <div className="item-contacto">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:xxxxxxxxx@gmail.com">
              xxxxxxxxx@gmail.com
            </a>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="footerTexto">
          <h3>Redes Sociales</h3>
        </div>

        <div className="columna">
          <div className="item-red">
            <FontAwesomeIcon icon={faTiktok} />
            <span>@xxxxxxxx</span>
          </div>

          <div className="item-red">
            <FontAwesomeIcon icon={faInstagram} />
            <span>@xxxxxxxx</span>
          </div>

          <div className="item-red">
            <FontAwesomeIcon icon={faTwitter} />
            <span>@xxxxxxxx</span>
          </div>
        </div>

        {/* Columna 3 */}
        <div className="columna sobre-nosotros">
            <h3>Sobre Nosotros</h3>
            <p> Innovamos la forma de gestionar y reservar citas en barberías de Bogotá, conectando clientes y barberos de manera rápida y sencilla. </p>
        </div>

      </footer>
    </section>
  );
}