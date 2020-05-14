var express = require('express')
const { check } = require('express-validator')
var api = express.Router()
const userController = require('../../controllers/user')
const authMiddleware = require('../../middleware/auth')

api.post(
  '/create',
  [
    // authMiddleware.validar,
    check('nome').isString().notEmpty(),
    check('email').isEmail(),
    check('senha').isLength({ min: 5 }).notEmpty(),
  ],
  function (req, res) {
    userController.create(req, res)
  }
)

api.get('/users', authMiddleware.validar, function (req, res) {
  userController.list(req, res)
})

api.put(
  '/update',
  [
    authMiddleware.validar,
    check('user_id').isInt(),
    check('nome').isString().notEmpty(),
    check('email').isEmail(),
    check('senha').isLength({ min: 5 }).notEmpty(),
  ],
  function (req, res) {
    userController.update(req, res)
  }
)

api.get('/edit/:id', [authMiddleware.validar, check('id').isInt()], function (
  req,
  res
) {
  userController.edit(req, res)
})

api.delete(
  '/delete/:id',
  [authMiddleware.validar, check('id').isInt()],
  function (req, res) {
    userController.delete(req, res)
  }
)

module.exports = api
