import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPost } from "../services/auth";
import axios from "axios";

export function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(""); 
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false)

  const navigate = useNavigate(); 

  const handleLogin = async () => {
  try {

    setIsLoading(true);

    const response = await loginPost(login, password);

    localStorage.setItem("token", response.data.token);

    setErrorMessage("");
    navigate("/home");

  } catch (error) {

    if (axios.isAxiosError(error)) {

      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;

      if (backendMessage) {
        setErrorMessage(backendMessage);
      } else if (status === 403 || status === 401) {
        setErrorMessage("Login ou senha incorretos.");
      } else {
        setErrorMessage("Erro ao tentar fazer login.");
      }

    } else {
      setErrorMessage("Erro inesperado.");
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <div className="user-container">
          <input
            type="text"
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <img src="/do-utilizador.png" alt="Usuário" />
        </div>


        

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <img
            src={showPassword ? "/olhos-cruzados.png" : "/olho.png"}
            alt="Mostrar senha"
            onMouseDown={(e) => {
              e.preventDefault(); 
              setShowPassword(!showPassword);
            }}
            className="toggle-password"
          />

        </div>


        {errorMessage && (
        <div className="login-error">
          <span className="error-icon">⚠</span>
          <span>{errorMessage}</span>
        </div>
      )}


        <button 
              className="btn-primary"
              onClick={handleLogin}
              disabled={isLoading}>{ isLoading ? "Entrando..." : "Entrar" }
        </button>
      </div>
    </div>
  );
} 
