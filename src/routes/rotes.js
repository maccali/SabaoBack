var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    message: 'Pug on ins express',
  })
})

module.exports = router
