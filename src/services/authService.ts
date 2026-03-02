import api from "../api/axios";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
}

export const login = (data: LoginData) => {
  return api.post("token/", data);
};

export const register = (data: RegisterData) => {
  return api.post("usuarios/registro/", data);
};