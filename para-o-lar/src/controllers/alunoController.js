const alunosModel = require('../models/alunos.json')

//Listar todos os alunos:
const todosAlunos = (request, response) => {
  response.status(200).json({
    mensagem: 'Essses são os alunos cadastrados',
    alunosModel
  })
}

//Buscar aluno por Id:
const buscarPorId = (request, response) => {
  try {
    const chamarId = request.params.id

    const acharId = alunosModel.find(aluno => aluno.alunoId == chamarId)
    if (!acharId) {
      throw new Error('Id não encontrado')
    }
    response.status(200).json(acharId)
  } catch (error) {
    response.status(500).json({
      message: error.message
    })
  }
}

//Listar por nome, se tiver social, trazer nome social:
const buscarPorNome = (request, response) => {
  try {
    const trazerNome = request.query.nome.toLowerCase()
    const encontrarNome = alunosModel.filter(aluno => {
      if (aluno.nomeSocial) {
        return aluno.nomeSocial.toLocaleLowerCase().includes(trazerNome)
      }
      return aluno.nome.toLocaleLowerCase().includes(trazerNome)
    })

    if (encontrarNome.length == 0) {
      throw new Error('Nome não encontrado')
    }

    response.status(200).json({
      mensagem: 'Aluno encontrado',
      encontrarNome
    })
  } catch (error) {
    response.status(500).json({
      message: error.message
    })
  }
}

//Cadastrar novo aluno:
const novoAluno = (request, response) => {
  let bodyRequest = request.body

  try {
    if (!bodyRequest.nome || bodyRequest.nome.trim() == '')
      throw new Error('O nome do aluno é obrigatorio para cadastramento')

    let novoCadastro = {
      alunoId: alunosModel.length + 1,
      nome: bodyRequest.nome,
      nomeSocial: bodyRequest.nomeSocial,
      idade: bodyRequest.idade,
      endereco: bodyRequest.endereco,
      telefone: bodyRequest.telefone,
      cpf: bodyRequest.cpf,
      serie: bodyRequest.serie,
      turno: bodyRequest.turno
    }
    alunosModel.push(novoCadastro)

    response.status(200).send({
      message: 'Aluno cadastrado com sucesso',
      novoCadastro
    })
  } catch (error) {
    response.status(400).json({
      message: 'Não foi possivel realizar o cadastro',
      details: error.message
    })
  }
}

//Atualizar endereço do aluno:
const atualizarEndereco = (request, response) => {
  let idRequest = request.params.id

  try {
    let novoEndereco = request.body.endereco

    if (!novoEndereco || novoEndereco.trim() == '')
      throw new Error('O preenchimento do campo endereço é obrigatório')

    const alunoEncontrado = alunosModel.find(
      aluno => aluno.alunoId == idRequest
    )
    alunoEncontrado.endereco = novoEndereco

    response.status(200).json({
      message: 'Endereço atualizado com sucesso',
      'Endereço do aluno atualizado': alunoEncontrado,
      alunosModel
    })
  } catch (error) {
    response.status(400).json({
      message: 'Não foi possível atualizar endereço do aluno'
    })
  }
}

//atualizar o cadastro do aluno:
const atualizarCadastro = (request, response) => {
  try {
    const idRequest = request.params.id
    const bodyRequest = request.body

    const alunoEncontrado = alunosModel.find(
      aluno => aluno.alunoId == idRequest
    )
    const indice = alunosModel.indexOf(alunoEncontrado)
    bodyRequest.alunoId = idRequest
    bodyRequest.nome = bodyRequest.nome || alunoEncontrado.nome
    bodyRequest.nomeSocial = bodyRequest.nomeSocial || alunoEncontrado.nomeSocial
    bodyRequest.idade = bodyRequest.idade || alunoEncontrado.idade
    bodyRequest.endereco = bodyRequest.endereco || alunoEncontrado.endereco
    bodyRequest.telefone = bodyRequest.telefone || alunoEncontrado.telefone
    bodyRequest.cpf = bodyRequest.cpf || alunoEncontrado.cpf
    bodyRequest.serie = bodyRequest.serie || alunoEncontrado.serie
    bodyRequest.turno = bodyRequest.turno || alunoEncontrado.turno
    alunosModel.splice(indice, 1, bodyRequest)

    if (alunoEncontrado == undefined) {
      throw new Error('Aluno não encontrado, pois o id não foi identificado.')
    }

    response.status(200).json({
      mensagem: 'Dados do aluno atualizado com sucesso',
      bodyRequest
    })
  } catch (error) {
    response.status(500).json({
      message: error.message
    })
    console.log(error)
  }
}

//Deletar o cadastro:
const deletarAluno = (request, response) => {
  try {
    const idRequest = request.params.id
    const alunoEncontrado = alunosModel.find(
      aluno => aluno.alunoId == idRequest
    )

    const indice = alunosModel.indexOf(alunoEncontrado)

    alunosModel.splice(indice, 1)

    if (alunoEncontrado == undefined) {
      throw new Error('Id não encontrado.')
    }

    response.status(200).json({
      mensagem: 'Aluno excluido com sucesso.'
    })
  } catch (error) {
    response.status(500).json({
      message: error.message
    })
    console.log(error)
  }
}

module.exports = {
  todosAlunos,
  buscarPorId,
  buscarPorNome,
  novoAluno,
  atualizarEndereco,
  atualizarCadastro,
  deletarAluno
}
