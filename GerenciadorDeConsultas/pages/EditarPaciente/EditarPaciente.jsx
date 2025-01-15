import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarPaciente.css";

const EditarPaciente = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const buscarPaciente = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7250/api/Pacientes/medico/${id}`
      );
      setNome(response.data.nome);
      setTelefone(response.data.telefone);
      setCpf(response.data.cpf);
    } catch (error) {
      console.error("Erro ao buscar dados do paciente:", error);
    }
  };

  const editarPaciente = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:7250/api/Pacientes/${id}`,
        {
          nome,
          telefone,
          cpf,
        }
      );
      if (response.status === 200) {
        alert("Paciente editado com sucesso!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao editar paciente:", error);
      alert("Erro ao editar paciente.");
    }
  };

  const voltarParaDashboard = () => {
    navigate("/dashboard-medico");
  };

  useEffect(() => {
    buscarPaciente();
  }, [id]);

  return (
    <div className="form-container">
      <h2>Editar Paciente</h2>
      <form onSubmit={editarPaciente}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
        <button type="submit">Salvar</button>
      </form>

      <button onClick={voltarParaDashboard}>Voltar</button>
    </div>
  );
};

export default EditarPaciente;
