// Estancia Espres
const express = require('express')
const cors = require('cors')
const app = express()
// usar morgam
const morgan = require('morgan')

// Parcer e rotas
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes/rotes')
const api = require('./routes/api')

const middleware = require('./middleware/main')

// Seta a engine para o render 
app.set('view engine', 'pug')

app.use(cors())

// Ao submeter um post do tipo raw com content type json tranforma req.body em json
app.use(express.json())

// Ao submeter um post do tipo form tranforma req.body em json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(morgan(':method :status :url :response-time'))

// Exemplo de midleware
// app.use(function(req, res, next){
//     console.log('i am a mid')
//     next();
// })

app.use(function (req, res, next) {
  middleware.logger(req, res, next)
  next();
})

// Modularisa rotas do servidor
app.use('/', routes)
app.use('/api', api)

// Enderesa o local dos arquivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')))

// Midleware de erro 
// Caso erros aconteçam ele cominica a função encarregada de responder a altura
api.use(function (err, req, res, next) {
  var data = { err, req, res, next }
  middleware.errorHand(data)
});

// se nada acontecer pocivelmente ele requisitou uma rota não existente
// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
  var data = { req, res }
  middleware.errorHand(data)
});

// Iniciando o servidor na porta 3000
app.listen(3355, function () {
  console.log('Express started on port 3355')
})
