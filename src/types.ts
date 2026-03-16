export interface Usuario {
  id: number;
  username: string;
  rol: string;
  // Estos campos son opcionales porque no sé si tu backend los devuelve, pero sirven para la UI
  estado?: 'Activo' | 'Inactivo';
  fechaRegistro?: string;
}

export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number; // en minutos
  imagen: string;
}

export type AdminView = 'Inicio' | 'Usuarios' | 'Servicios' | 'Reportes' | 'Barberías';