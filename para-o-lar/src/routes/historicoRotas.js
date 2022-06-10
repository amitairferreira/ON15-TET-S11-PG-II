const express = require('express')

const controller = require('../controllers/historicoController')

const router = express.Router()

//Rotas
router.get('/todos', controller.todosHistoricos)
router.get('/filtrar/:id', controller.buscarPorId)

module.exports = router