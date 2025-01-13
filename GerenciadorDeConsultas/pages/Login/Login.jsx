import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("paciente");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7250/api/Login/login",
        {
          email,
          password,
          role,
        }
      );

      if (response.status === 200) {
        const data = response.data;

        // Armazena o token no localStorage
        localStorage.setItem("token", data.token);

        // Redireciona para o dashboard de acordo com o papel
        if (data.role === "medico") {
          navigate("/dashboard-medico");
        } else if (data.role === "paciente") {
          navigate("/dashboard-paciente");
        }
      }
    } catch (err) {
      console.error("Erro de login:", err); // Log detalhado do erro
      setError(err.response ? err.response.data : "Erro desconhecido");
    }
  };

  return (
    <div className="login-container">
      <h1>Gerenciador de Consultas</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Paciente ou Médico?
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="paciente">Paciente</option>
            <option value="medico">Médico</option>
          </select>
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Não é cadastrado? <a href="/cadastro">Cadastre-se</a>
      </p>
    </div>
  );
};

export default Login;
