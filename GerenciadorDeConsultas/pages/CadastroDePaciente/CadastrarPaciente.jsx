import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style.css";

const CadastrarPaciente = () => {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // Função para enviar dados do paciente
  const cadastrarPaciente = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7250/api/Pacientes",
        {
          nome,
          dataNascimento,
          telefone,
          cpf,
          email,
          senha,
        }
      );

      if (response.status === 200) {
        alert("Paciente cadastrado com sucesso!");
        navigate("/dashboard"); // Redireciona para a dashboard após o cadastro
      }
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      alert("Erro ao cadastrar paciente.");
    }
  };

  // Função para voltar para a página anterior (dashboard)
  const voltarParaDashboard = () => {
    navigate("/dashboard-medico"); // Redireciona para a página do médico (dashboard)
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Paciente</h2>
      <form onSubmit={cadastrarPaciente}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label>Data de Nascimento:</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          required
        />
        <label>Telefone:</label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      <button onClick={voltarParaDashboard} className="voltar-button">
        Cancelar
      </button>
    </div>
  );
};

export default CadastrarPaciente;
