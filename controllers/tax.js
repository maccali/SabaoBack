const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const model = require('../database/models/index')
const encript = require('../config/encript')

function generateToken(params = {}) {
  const token = jwt.sign({
    params,
  },
    encript.jwtHash,
    {
      expiresIn: 86400
    }
  )

  return token
}


var userController = {
  create: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    var { nome, email, senha } = req.body

    try {
      // Busca se usuário existe
      var usuario = await model.User.findOne({
        where: {
          email: email
        }
      })

      if (usuario) {
        console.log(usuario)
        return res.status(400).send({
          error: 'User already exists'
        })
      }

      // Encripta senha do usuário
      senha = bcrypt.hashSync(senha, encript.passwordHash)

      // Cria novo usuario
      const usuarioCriacao = await model.User.create({
        nome,
        email,
        senha
      })

      // Define senha como undefined para não retornar do post
      usuarioCriacao.senha = undefined;

      return res.send({
        usuarioCriacao,
        token: generateToken({ uid: usuarioCriacao.user_id })
      })

    } catch (err) {
      console.log(err)
      return res.status(400).send({
        error: 'Registration failed',
        message: err
      })
    }
  },

  list: async (req, res) => {
    var users = await model.User.findAll()
    return res.status(200).send({
      users
    })
  },

  update: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    let { user_id, nome, email, senha } = req.body

    if (req.jwt.uid !== user_id) {
      return res.status(401).send({
        error: 'You are not this user',
      })
    }

    var usuario = await model.User.update({
      nome,
      email
    }, {
      where: {
        user_id
      }
    })

    return res.status(200).send({
      usuario
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

    var usuario = await model.User.findOne({
      where: {
        user_id: id
      }
    })

    if (usuario) {
      return res.status(200).send({
        usuario
      })
    } else {
      return res.status(400).send({
        error: 'User does not exists'
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

    var usuario = await model.User.findOne({
      where: {
        user_id: id
      }
    })

    if (usuario) {
      usuario.destroy()
      return res.status(200).send({
        usuario
      })
    } else {
      return res.status(400).send({
        error: 'User does not exists'
      })
    }
  }
}

module.exports = userController


