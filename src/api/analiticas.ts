import api from './axios';

export interface AdminAnalyticsData {
  total_ganado: number;
  clientes_nuevos: number;
  valor_promedio_dia: number;
  popular_services: {
    name: string;
    value: number;
    color: string;
  }[];
  barbers_performance: {
    name: string;
    role: string;
    citas: number;
    completadas: number;
    rating: number;
    ingresos: number;
    avatar: string;
  }[];
  chart_data: number[];
  chart_labels: string[];
}

export const getAdminAnalytics = async (timeRange: string): Promise<AdminAnalyticsData> => {
  try {
    const response = await api.get(`/agenda/analytics/admin/?timeRange=${encodeURIComponent(timeRange)}`);
    
    if (response.data.success) {
      return response.data.data as AdminAnalyticsData;
    } else {
      throw new Error(response.data.message || 'Error desconocido');
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Error al obtener datos de analíticas');
  }
};
