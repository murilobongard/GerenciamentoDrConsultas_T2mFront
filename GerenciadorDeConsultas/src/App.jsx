import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadatro/Cadastro";
import DashboardMedico from "../pages/homeMedicos/home";
import DashboardPaciente from "../pages/homePacientes/homePaciente";
import EditarPaciente from "../pages/EditarPaciente/EditarPaciente";
import CadastrarPaciente from "../pages/CadastroDePaciente/CadastrarPaciente";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard-medico" element={<DashboardMedico />} />
        <Route path="/dashboard-paciente" element={<DashboardPaciente />} />
        <Route path="/editarPaciente/:id" element={<EditarPaciente />} />
        <Route path="/cadastrarPaciente" element={<CadastrarPaciente />} />
      </Routes>
    </Router>
  );
}

export default App;
