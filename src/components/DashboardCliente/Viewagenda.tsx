import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Calendario from "../../components/Calendario";
import type { Bloque } from "../../components/Calendario";
import "../../index.css";
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  user_id: string;
  token_type?: string;
  exp?: number;
  iat?: number;
  jti?: string;
}

interface Barbero {
  id: string;
  username: string; // Cambiado de 'nombre' para coincidir con el Serializer
  especialidad: string;
}

export default function AgendaCitasCliente() {
  const [barberos, setBarberos] = useState<Barbero[]>([]);
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<string | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>("");
  const [horaDbSeleccionada, setHoraDbSeleccionada] = useState<string>("");
  const [bloquesDisponibles, setBloquesDisponibles] = useState<Bloque[]>([]);
  const [cedulaCliente, setCedulaCliente] = useState<number | null>(null);

  const navigate = useNavigate();

  // 🔹 1. Decodificar JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.user_id) {
        setCedulaCliente(Number(decoded.user_id));
      }
    } catch (err) {
      console.error("Error decodificando token:", err);
      navigate("/login");
    }
  }, [navigate]);

  // 🔹 2. Cargar Barberos (Ajustado a respuesta estructurada)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/usuarios/barberos/")
      .then(res => res.json())
      .then(response => {
        // Accedemos a response.data porque el backend envía { success, message, data }
        if (response.success && Array.isArray(response.data)) {
          setBarberos(response.data);
        } else {
          setBarberos([]);
        }
      })
      .catch(err => {
        console.error("Error cargando barberos:", err);
        setBarberos([]);
      });
  }, []);

  // 🔹 3. Cargar Disponibilidad (Ajustado a respuesta estructurada)
  useEffect(() => {
    if (!barberoSeleccionado || !fechaSeleccionada) {
      setBloquesDisponibles([]);
      return;
    }

    const fetchDisponibilidad = async () => {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/agenda/disponibilidad/?barberoId=${barberoSeleccionado}&fecha=${fechaSeleccionada}&servicioId=1`
    );
    const response = await res.json();

    console.log("Datos recibidos de disponibilidad:", response); // 🚩 REVISA ESTO EN LA CONSOLA

    let bloquesExtraidos: Bloque[] = [];

    // Caso A: Viene envuelto en api_response { success: true, data: [...] }
    if (response.success && Array.isArray(response.data)) {
      bloquesExtraidos = response.data;
    } 
    // Caso B: Viene el array directo [...]
    else if (Array.isArray(response)) {
      bloquesExtraidos = response;
    }

    setBloquesDisponibles(bloquesExtraidos);

  } catch (err) {
    console.error("Error cargando horas:", err);
    setBloquesDisponibles([]);
  }
};
    fetchDisponibilidad();
  }, [barberoSeleccionado, fechaSeleccionada]);

  // 🔹 4. Reservar Cita
  const handleConfirmar = async () => {
    const horaFinal = horaDbSeleccionada || horaSeleccionada;
    const token = localStorage.getItem("token");

    if (!barberoSeleccionado || !fechaSeleccionada || !horaFinal || !cedulaCliente) {
      alert("Por favor selecciona todos los campos.");
      return;
    }

    const reservaData = {
      fecha: fechaSeleccionada,
      hora: horaFinal,
      cedula_barbero_id: barberoSeleccionado, // Ajustado a los nombres de tu modelo
      cedula_cliente_id: String(cedulaCliente),
      id_servicio: 1
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/citas/reservar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(reservaData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        alert("Error: " + (responseData.message || "No se pudo crear la cita"));
        return;
      }

      alert("¡Cita agendada con éxito!");
      navigate("/DashboardCliente");
    } catch (error) {
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="landing-page py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mb-4">
        <Link to="/DashboardCliente" className="text-primary font-bold hover:underline flex items-center gap-2 w-fit">
          ← Volver al inicio
        </Link>
      </div>

      <div className="w-full max-w-3xl p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-slate-900 dark:text-white">
          Reserva tu cita
        </h2>

        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">1. Elige tu Barbero</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* ✅ VALIDACIÓN CRÍTICA PARA EVITAR EL CRASH */}
          {Array.isArray(barberos) && barberos.length > 0 ? (
            barberos.map((barbero) => (
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                key={barbero.id}
                onClick={() => {
                  setBarberoSeleccionado(barbero.id);
                  setFechaSeleccionada("");
                  setHoraSeleccionada("");
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  barberoSeleccionado === barbero.id
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                }`}
              >
                <p className="font-bold">{barbero.username}</p>
                <p className="text-sm opacity-80">{barbero.especialidad || "Barbero"}</p>
              </motion.button>
            ))
          ) : (
            <p className="col-span-full text-center py-4 text-slate-500">Cargando barberos disponibles...</p>
          )}
        </div>

        {barberoSeleccionado && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">2. Selecciona el Día</h3>
            <input
              type="date"
              className="w-full sm:w-1/2 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              value={fechaSeleccionada}
              onChange={(e) => {
                setFechaSeleccionada(e.target.value);
                setHoraSeleccionada("");
              }}
              min={new Date().toISOString().split('T')[0]}
            />
          </motion.div>
        )}

        {fechaSeleccionada && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">3. Selecciona la Hora</h3>
            <Calendario
              bloquesDelDia={bloquesDisponibles}
              horaSeleccionada={horaSeleccionada}
              onSeleccionarHora={(hora, hora_db) => {
                setHoraSeleccionada(hora);
                setHoraDbSeleccionada(hora_db);
              }}
            />
          </motion.div>
        )}

        <button
          disabled={!barberoSeleccionado || !fechaSeleccionada || !horaSeleccionada}
          onClick={handleConfirmar}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg disabled:opacity-50 hover:brightness-110 transition-all shadow-xl shadow-primary/20"
        >
          Confirmar Cita
        </button>
      </div>
    </div>
  );
}