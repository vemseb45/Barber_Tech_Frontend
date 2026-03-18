import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import Calendario from "../../components/Calendario";

import type { Bloque } from "../../components/Calendario";

import "../../index.css";



// Import correcto para jwt-decode en ES Modules

import { jwtDecode } from 'jwt-decode';



// Ajustado según el payload real de tu token: { "user_id": "4", ... }

interface JwtPayload {

  user_id: string;

  token_type?: string;

  exp?: number;

  iat?: number;

  jti?: string;

}



interface Barbero {

  id: string;

  nombre: string;

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



  // 🔹 Decodificar JWT al cargar el componente

  useEffect(() => {

    // IMPORTANTE: Asegúrate que en el Login guardes exactamente como "accessToken"

    const token = localStorage.getItem("token");



    if (!token) {

      console.warn("No se encontró accessToken en LocalStorage");

      alert("No se encontró sesión activa. Por favor, inicia sesión.");

      navigate("/login");

      return;

    }



    try {

      const decoded = jwtDecode<JwtPayload>(token);



      // Convertimos el ID de string a número para mantener la compatibilidad con tu estado

      if (decoded.user_id) {

        setCedulaCliente(Number(decoded.user_id));

      } else {

        console.error("El token no contiene el campo user_id esperado");

      }

    } catch (err) {

      console.error("Error decodificando token:", err);

      alert("La sesión ha expirado o es inválida.");

      navigate("/login");

    }

  }, [navigate]);



  // 1. CARGAR BARBEROS

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/agenda/barberos/")

      .then(res => res.json())

      .then(data => setBarberos(data))

      .catch(err => console.error("Error cargando barberos:", err));

  }, []);



  // 2. CARGAR DISPONIBILIDAD

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



        const text = await res.text();

        const data = JSON.parse(text);

        setBloquesDisponibles(Array.isArray(data) ? data : []);

      } catch (err) {

        console.error("Error cargando horas:", err);

        setBloquesDisponibles([]);

      }

    };



    fetchDisponibilidad();

  }, [barberoSeleccionado, fechaSeleccionada]);



  // 3. RESERVAR CITA

  const handleConfirmar = async () => {

    const horaFinal = horaDbSeleccionada || horaSeleccionada;

    const token = localStorage.getItem("token");



    if (!barberoSeleccionado || !fechaSeleccionada || !horaFinal || !cedulaCliente) {

      alert("Por favor selecciona todos los campos.");

      return;

    }



    // 🚨 AJUSTE DE LLAVES PARA COINCIDIR CON EL BACKEND

    const reservaData = {

      fecha: fechaSeleccionada,

      hora: horaFinal,

      cedula_barbero: barberoSeleccionado, // Quitamos el _id

      cedula_cliente: String(cedulaCliente), // Quitamos el _id y enviamos como string

      id_servicio: 1

    };



    console.log("Enviando datos al servidor:", reservaData);



    try {

      const response = await fetch("http://127.0.0.1:8000/api/agenda/reservar/", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "Authorization": `Bearer ${token}`

        },

        body: JSON.stringify(reservaData)

      });



      const responseData = await response.json();



      if (!response.ok) {

        console.error("Error del backend:", responseData);

        alert("Error: " + (responseData.error || "No se pudo crear la cita"));

        return;

      }



      alert("¡Cita agendada con éxito!");

      navigate("/DashboardCliente");

    } catch (error) {

      console.error("Error en la conexión:", error);

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

          {barberos.map((barbero) => (

            <motion.button

              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}

              key={barbero.id}

              onClick={() => {

                setBarberoSeleccionado(barbero.id);

                setFechaSeleccionada("");

                setHoraSeleccionada("");

              }}

              className={`p-4 rounded-xl border text-left transition-all ${barberoSeleccionado === barbero.id

                ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"

                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"

                }`}

            >

              <p className="font-bold">{barbero.nombre}</p>

              <p className="text-sm opacity-80">{barbero.especialidad}</p>

            </motion.button>

          ))}

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

