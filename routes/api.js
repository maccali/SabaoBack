var express = require('express')
var api = express.Router();
var auth = require('./api/auth')
var user = require('./api/user')
var recordPurchase = require('./api/recordPurchase')
var tex = require('./api/tex')

api.use('/user', user)
api.use('/auth', auth)
api.use('/record', recordPurchase)
api.use('/tex', tex)

api.get('/', function (req, res) {
  res.json({
    massage: 'hello word from api'
  })
})

module.exports = api;