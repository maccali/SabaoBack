const { validationResult } = require('express-validator')
const model = require('../database/models/index')

const arrAtributes = [
  'record_id',
  'releaseDate',
  'distributingTax',
  'amount',
  'grossAmount',
  'taxRate',
  'distributingTax',
  'taxRatePay',
  'distributingTaxPay',
  'description',
]

var recordPurchaseController = {
  create: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    var { description, value, date } = req.body
    var tax = 6
    var distributingTax = 18.5

    var taxRate = value * (tax / 100)
    var distributingTax = value * (distributingTax / 100)
    var discount = distributingTax + taxRate
    var grossAmount = value - discount

    const recordPurchase = await model.RecordPurchase.create({
      user_id: req.jwt.uid,
      releaseDate: date,
      description,
      amount: value,
      grossAmount,
      taxRate,
      distributingTax,
      taxRatePay: false,
      distributingTaxPay: false
    })

    return res.status(200).send({
      recordPurchase
    })
  },

  list: async (req, res) => {

    var records = await model.RecordPurchase.findAll({
      attributes: arrAtributes,
      where: {
        user_id: req.jwt.uid
      }
    })

    return res.status(200).send({
      records
    })

  },

  update: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    let { record_id, taxRatePay, distributingTaxPay } = req.body

    var record = await model.RecordPurchase.update({
      taxRatePay,
      distributingTaxPay
    }, {
      where: {
        user_id: req.jwt.uid,
        record_id,
      }
    })

    return res.status(200).send({
      record
    })

  },

  edit: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    let { id } = req.params

    var record = await model.RecordPurchase.findOne({
      attributes: arrAtributes,
      where: {
        user_id: req.jwt.uid,
        record_id: id,
      }
    })

    if (record) {
      return res.status(200).send({
        record
      })
    } else {
      return res.status(400).send({
        error: 'Record Purchase does not exists'
      })
    }

  },
  delete: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    let { id } = req.params

    var record = await model.RecordPurchase.findOne({
      attributes: arrAtributes,
      where: {
        user_id: req.jwt.uid,
        record_id: id,
      }
    })

    if (record) {
      record.destroy()
      return res.status(200).send({
        record
      })
    } else {
      return res.status(400).send({
        error: 'Record Purchase does not exists'
      })
    }

  }
}

module.exports = recordPurchaseController


