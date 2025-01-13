import React, { useState } from "react";
import axios from "axios"; // Importando Axios
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "./Cadastro.css";

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    telefone: "",
    cpf: "",
    email: "",
    senha: "",
    crm: "",
    especialidade: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMedico, setIsMedico] = useState(false); // Estado para verificar se é médico

  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setIsMedico(e.target.value === "medico"); // Alterar isMedico conforme a seleção
    setFormData({
      ...formData,
      crm: "", // Limpar o CRM e especialidade ao mudar de role
      especialidade: "",
    });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      // Monta o payload com base no tipo de usuário (médico ou paciente)
      const payload = isMedico
        ? {
            nome: formData.nome,
            crm: formData.crm,
            email: formData.email,
            senha: formData.senha,
            especialidade: formData.especialidade,
          }
        : {
            nome: formData.nome,
            dataNascimento: formData.dataNascimento,
            telefone: formData.telefone,
            cpf: formData.cpf,
            email: formData.email,
            senha: formData.senha,
          };

      // Definindo a URL para o tipo de cadastro
      const url = isMedico
        ? "https://localhost:7250/api/Medico"
        : "https://localhost:7250/api/Paciente";

      // Realizando a requisição POST usando Axios
      const response = await axios.post(url, payload);

      // Se a resposta for OK
      if (response.status === 200) {
        setSuccessMessage("Cadastro realizado com sucesso!");
        setErrorMessage("");
        setFormData({
          nome: "",
          dataNascimento: "",
          telefone: "",
          cpf: "",
          email: "",
          senha: "",
          crm: "",
          especialidade: "",
        });

        // Redirecionar para a página de login
        setTimeout(() => {
          navigate("/"); // Redireciona para a página de login
        }, 2000); // Aguarda 2 segundos para o usuário visualizar a mensagem de sucesso
      }
    } catch (err) {
      // Erro ao cadastrar
      setErrorMessage(err.response ? err.response.data : err.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleCadastro} className="cadastro-form">
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </label>

        {/* Seleção entre Médico ou Paciente */}
        <label>
          Tipo de Usuário:
          <select
            onChange={handleRoleChange}
            value={isMedico ? "medico" : "paciente"}
          >
            <option value="paciente">Paciente</option>
            <option value="medico">Médico</option>
          </select>
        </label>

        {/* Campos adicionais para Paciente */}
        {!isMedico && (
          <>
            <label>
              Data de Nascimento:
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Telefone:
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              CPF:
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        {/* Campos adicionais para Médico */}
        {isMedico && (
          <>
            <label>
              CRM:
              <input
                type="text"
                name="crm"
                value={formData.crm}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Especialidade:
              <input
                type="text"
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </label>

        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta? <a href="/">Faça login</a>
      </p>
    </div>
  );
}

export default Cadastro;
