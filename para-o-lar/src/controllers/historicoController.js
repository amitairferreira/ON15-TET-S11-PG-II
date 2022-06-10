const historicoModel = require('../models/historicos.json')
const alunosModel = require('../models/alunos.json')

//listar todos os historicos
const todosHistoricos = (request, response) => {
  try {
    historicoModel.forEach(historico => {
      const alunoEncontrado = alunosModel.find(
        aluno => aluno.alunoId == historico.aluno
      )
      historico.aluno = alunoEncontrado
    })
    response.status(200).json({
      mensagem: 'Esses são os históricos cadastrados',
      historicoModel
    })
    
  } catch (error) {
    response.status(500).json({
      message: error.message
    })
  }
}

//buscar histórico por Id
const buscarPorId = (request, response) => {
  try {
    const chamarId = request.params.id

    const historicoEncontrado = historicoModel.find(
      historico => historico.historicoId == chamarId
    )
    if (!historicoEncontrado) {
      throw new Error('Id não encontrado')
    }
    const alunoEncontrado = alunosModel.find(
      aluno => aluno.alunoId == historicoEncontrado.aluno
    )
    historicoEncontrado.aluno = alunoEncontrado
    response.status(200).json(historicoEncontrado)
  } catch (error) {
    response.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  todosHistoricos,
  buscarPorId
}
