import { users } from "../mock/users";

// Servicio encargado de validar usuarios
export const loginUser = (correo: string, password: string) => {
  return users.find(
    (user) => user.correo === correo && user.password === password,
  );
};
