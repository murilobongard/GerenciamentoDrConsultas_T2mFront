import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Dashboard = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicoLogado, setMedicoLogado] = useState(null);
  const navigate = useNavigate();

  const medicoId = localStorage.getItem("medicoId");
  if (!medicoId) {
    console.error("ID do médico não encontrado.");
    return null;
  }

  const fetchMedicoLogado = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7250/api/Medico/${medicoId}`
      );
      setMedicoLogado(response.data.nome);
    } catch (error) {
      console.error("Erro ao buscar médico logado:", error);
    }
  };

  const fetchConsultas = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7250/api/consultas/medico/${medicoId}`
      );
      setConsultas(response.data);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const fetchPacientes = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7250/api/Consulta/medico/${medicoId}/pacientes`
      );
      setPacientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  const openModal = (contentType) => {
    setModalContent(contentType);
    setIsModalOpen(true);
    if (contentType === "consultas") fetchConsultas();
    if (contentType === "pacientes") fetchPacientes();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const editPaciente = (id) => {
    navigate(`/editarPaciente/${id}`);
  };

  const deleteItem = (id) => {
    console.log("Excluir item com ID:", id);
  };

  const goToCadastrarPaciente = () => {
    navigate("/cadastrarPaciente");
  };

  useEffect(() => {
    fetchMedicoLogado();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="Titulo">Sistema de Gerenciamento de Consultas</h1>
      </header>

      <div className="dashboard-center">
        <div className="button-container">
          <button onClick={() => openModal("consultas")}>
            Lista de Consultas
          </button>
          <button onClick={() => openModal("pacientes")}>
            Lista de Pacientes
          </button>
          <button onClick={goToCadastrarPaciente}>Cadastrar Paciente</button>{" "}
          {/* Botão de Cadastro */}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {modalContent === "consultas"
                ? "Consultas Agendadas"
                : "Lista de Pacientes"}
            </h2>
            <ul>
              {modalContent === "consultas" &&
                consultas.map((consulta) => (
                  <li key={consulta.id}>
                    {consulta.data} - {consulta.paciente.nome}
                    <button onClick={() => editPaciente(consulta.id)}>
                      Editar
                    </button>
                    <button onClick={() => deleteItem(consulta.id)}>
                      Excluir
                    </button>
                  </li>
                ))}
              {modalContent === "pacientes" &&
                pacientes.map((paciente) => (
                  <li key={paciente.id}>
                    {paciente.nome}
                    <button onClick={() => editPaciente(paciente.id)}>
                      Editar
                    </button>
                    <button onClick={() => deleteItem(paciente.id)}>
                      Excluir
                    </button>
                  </li>
                ))}
            </ul>
            <button className="close-modal-btn" onClick={closeModal}>
              Fechar Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
