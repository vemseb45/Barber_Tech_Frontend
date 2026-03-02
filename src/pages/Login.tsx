import { login } from "../services/authService";

export default function Login() {

  const handleLogin = async () => {
    const response = await login({
      username: "Sebastian",
      password: "Admin123*",
    });

    console.log(response.data);
  };

  return (
    <button onClick={handleLogin}>
      Probar Login
    </button>
  );
}