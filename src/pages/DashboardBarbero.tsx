export default function DashboardBarbero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-primary/20 text-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold mb-4 text-primary">Panel BarberTech</h1>
        <p className="text-slate-600">Bienvenido al sistema de control y reservas.</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="mt-8 px-6 py-3 w-full bg-primary text-white font-bold rounded-xl hover:bg-[#5213fc] transition shadow-lg shadow-primary/30"
        >
          Volver a Inicio
        </button>
      </div>
    </div>
  );
}
