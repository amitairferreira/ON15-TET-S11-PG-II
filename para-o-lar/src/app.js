const express = require("express")
const cors = require("cors")
const alunosRotas = require("./routes/alunoRotas")
const historicosRotas = require("./routes/historicoRotas")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/alunos", alunosRotas)

app.use("/historicos", historicosRotas)

module.exports = app