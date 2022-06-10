const express = require("express")

const controller = require("../controllers/alunoController")

const router = express.Router()

//Rotas:
router.get('/todos', controller.todosAlunos)
router.get('/filtrar/:id', controller.buscarPorId)
router.get('/filtrarNome', controller.buscarPorNome)
router.post('/cadastrar', controller.novoAluno)
router.patch('/atualizarEnd/:id', controller.atualizarEndereco)
router.put('/atualizar/:id', controller.atualizarCadastro)
router.delete('/deletar/:id', controller.deletarAluno)

module.exports = router