import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [isMedico, setIsMedico] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setIsMedico(e.target.value === "medico");
    setFormData({
      ...formData,
      crm: "",
      especialidade: "",
    });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
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

      const url = isMedico
        ? "https://localhost:7250/api/Medico"
        : "https://localhost:7250/api/Paciente";

      const response = await axios.post(url, payload);

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

        setTimeout(() => {
          navigate("/");
        }, 2000);
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
