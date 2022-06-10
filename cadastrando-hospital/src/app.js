//importar o express
const express = require("express")
//importar o cors e colocar dentro de uma variavel
const cors = require("cors")
//criar uma constante chamada app que chama o express
const app = express()

//configurar a api
//body-parser, pelo app, usando o metodo use, e vai chamar o express.json
app.use(express.json())

//configurar acessando o metodo use pelo app, cahamando o cors
app.use(cors())

//COMO FAZER AS ROTAS FUNCIONAREM
//importar as rotas criando uma constante
const pacientesRota = require("./routes/pacienteRoutes")
//preciso usar o metodo use para acessar a rota
app.use("/pacientes", pacientesRota)


//exportando o modulo app
module.exports = app