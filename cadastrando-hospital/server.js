//importar o app para o server
const app = require("./src/app")

//criar uma porta como uma variavel
const PORTA = 8090

//acessar o app e utilizar o listen para ouvir a porta
//colocar a variavel como parametro e faz uma callback
//dentro da callback crio um console com o template string
//para imprimir no meu terminal frase e variavel porta
app.listen(PORTA, () => console.log(`Agora vai na porta ${PORTA}`))