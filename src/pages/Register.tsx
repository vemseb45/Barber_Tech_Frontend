import { register } from "../services/authService";

export default function Register() {

  const handleRegister = async () => {
    await register({
      nombres: "Test",
      apellidos: "User",
      email: "test@test.com",
      password: "Admin123*",
    });
  };

  return (
    <button onClick={handleRegister}>
      Registrar usuario
    </button>
  );
}