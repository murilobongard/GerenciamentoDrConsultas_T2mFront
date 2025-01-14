import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

const Dashboard = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicoLogado, setMedicoLogado] = useState(null);

  // Obtendo o ID do médico diretamente do localStorage
  const medicoId = localStorage.getItem("medicoId");
  console.log("medicoId:", medicoId);
  if (!medicoId) {
    console.error("ID do médico não encontrado.");
    return null; // Retorna null ou exibe algo indicando que o médico não está logado
  }

  // Função para buscar dados do médico logado
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

  // Função para buscar consultas
  const fetchConsultas = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7250/api/consultas/medico/${medicoId}`
      );
      console.log(response.data); // Adicione esta linha para verificar os dados retornados
      setConsultas(response.data);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  // Função para buscar pacientes
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

  // Abrir modal com conteúdo específico
  const openModal = (contentType) => {
    setModalContent(contentType);
    setIsModalOpen(true);
    if (contentType === "consultas") fetchConsultas();
    if (contentType === "pacientes") fetchPacientes();
  };

  // Fechar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // Funções de editar/excluir/adicionar observações
  const editItem = (id) => {
    console.log("Editar item com ID:", id);
  };

  const deleteItem = (id) => {
    console.log("Excluir item com ID:", id);
  };

  const addObservation = (id, observation) => {
    console.log(`Adicionar observação para paciente ID ${id}:`, observation);
  };

  useEffect(() => {
    fetchMedicoLogado();
  }, []);

  return (
    <div className="dashboard">
      {/* Navbar */}
      <header className="dashboard-header">
        <h1 className="Titulo">Sistema de Gerenciamento de Consultas</h1>
      </header>

      {/* Corpo da página */}
      <div className="dashboard-center">
        <div className="button-container">
          <button onClick={() => openModal("consultas")}>
            Lista de Consultas
          </button>
          <button onClick={() => openModal("pacientes")}>
            Lista de Pacientes
          </button>
        </div>
      </div>

      {/* Modal */}
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
                    <button onClick={() => editItem(consulta.id)}>
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
                    <button onClick={() => editItem(paciente.id)}>
                      Editar
                    </button>
                    <button onClick={() => deleteItem(paciente.id)}>
                      Excluir
                    </button>
                    <button
                      onClick={() =>
                        addObservation(paciente.id, "Nova observação")
                      }
                    >
                      Adicionar Observação
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
