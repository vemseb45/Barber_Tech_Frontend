import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark font-display">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Dashboard</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Bienvenido. Iniciaste sesión correctamente.</p>
      <Link to="/" className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Volver al Inicio</Link>
    </div>
  );
}
