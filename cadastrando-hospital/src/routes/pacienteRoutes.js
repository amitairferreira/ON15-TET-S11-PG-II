//vou chamar o express, pois consigo acessar o metodo Router (rotas)
const express = require("express")
//chamar o controller
const controller = require("../controller/pacienteController")
//criar uma variavel para o routers
const routes = express.Router()
//crio as rotas:

//rota para listar todos os pacientes (GET)
routes.get("/todos", controller.todosPacientes)
//rota para listar por id (GET)
routes.get("/filtrar/:id", controller.buscarPorId)
//rota por nome, se tiver nome social, trazer por nome social (GET)
routes.get("/filtrarNome", controller.buscarPorNome)
//rota para criar os pacientes (POST)
routes.post("/cadastrar", controller.cadastrarPacientes)
//rota para atualizar o cadastro do paciente (PUT)
routes.put("/atualizar/:id", controller.atualizarPacientes)
//rota para deletar o cadastro (DELETE)
routes.delete("/excluir/:id", controller.excluirPaciente)
//exportar o routes
module.exports = routes
