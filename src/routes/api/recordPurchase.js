var express = require('express')
const { check } = require('express-validator')
var api = express.Router();
const recordPurchaseController = require('../../controllers/recordPurchase');
const authMiddleware = require('../../middleware/auth')
const Validator = require('../../validators/index')

api.post('/create',
  [
    authMiddleware.validar,
    check('description').isString().notEmpty(),
    check('value').isFloat(),
    // check('date').custom(val => Validator.validDateAndPast(val))
    check('date').custom(val => Validator.validDateAndPast(val))
  ],
  function (req, res) {
    recordPurchaseController.create(req, res)
  })

api.get('/records',
  authMiddleware.validar,
  function (req, res) {
    recordPurchaseController.list(req, res);
  })

api.put('/update',
  [
    authMiddleware.validar,
    check('record_id').isInt(),
    check('taxRatePay').isBoolean(),
    check('distributingTaxPay').isBoolean(),
  ],
  function (req, res) {
    recordPurchaseController.update(req, res);
  })

api.get('/edit/:id',
  [
    authMiddleware.validar,
    check('id').isInt(),
  ],
  function (req, res) {
    recordPurchaseController.edit(req, res);
  })

api.delete('/delete/:id',
  [
    authMiddleware.validar,
    check('id').isInt(),
  ],
  function (req, res) {
    recordPurchaseController.delete(req, res);
  })

module.exports = api;