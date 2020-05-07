var express = require('express')
const { check } = require('express-validator')
var api = express.Router();
const authController = require('../../controllers/auth');

api.post('/authenticate',
  [
    check('email').isEmail(),
    check('senha').notEmpty()
  ],
  function (req, res) {
    authController.authenticate(req, res)
  })

api.post('/forgot_password',
  [
    check('email').isEmail()
  ],
  function (req, res) {
    authController.forgotPassword(req, res)
  })

api.post('/reset_password', function (req, res) {
  authController.resetPassword(req, res)
})


module.exports = api;