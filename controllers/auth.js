const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { validationResult } = require('express-validator')
const model = require('../database/models/index')
const encript = require('../config/encript')
const mailer = require('../config/nodemailer')

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


var authController = {

  authenticate: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, senha } = req.body;

    const usuario = await model.User.findOne({
      where: {
        email: email
      }
    })

    if (!usuario) {
      return res.status(400).send({
        error: 'User not Found'
      })
    }

    if (!await bcrypt.compare(senha, usuario.senha)) {
      return res.status(400).send({
        error: 'Invalid Password'
      })
    }

    usuario.senha = undefined;

    res.send({
      usuario,
      token: generateToken({ 
        uid: usuario.user_id,
        umail: usuario.email 
      })
    })
  },

  forgotPassword: async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    } 

    try {
      // Desconstrução
      const { email } = req.body

      // Busca usuário do email passado
      const usuario = await model.User.findOne({
        where: {
          email: email
        }
      })

      // Se não achar
      if (!usuario) {
        return res.status(400).send({
          error: 'User not Found'
        })
      }

      // Gera token para o reset
      const token = crypto.randomBytes(20).toString('hex')

      // Gera data de expiração para o token 
      const now = new Date()

      // Define tempo de expiração
      now.setHours(now.getHours() + 1)

      // Atualiza usuário com os dados do reset
      model.User.update({
        senhaResetarToken: token,
        senhaResetarExpira: now
      },
        { where: { user_id: usuario.user_id } }
      )

      mailer.sendMail({
        to: email,
        from: 'guimaccali@gmail.com',
        template: 'forgot_password',
        context: { token },

      }, (err) => {
        if (err) {
          console.log(err)
          return res.status(400).send({
            error: 'Cannot send forgot password email'
          })
        }
        res.status(200).send({
          message: 'Mail sended'
        });
      })
    } catch (err) {

      res.status('400').send({
        error: 'Erro on forgot password, try again'
      })
    }
  },

  resetPessword: async (req, res) => {
    try {
      const { email, senha, token } = req.body

      // Busca usuário do email passado
      const usuario = await model.User.findOne({
        where: {
          email: email
        }
      })

      // Se não achar
      if (!usuario) {
        return res.status(400).send({
          error: 'User not Found'
        })
      }

      if (token !== usuario.senhaResetarToken) {
        return res.status(400).send({
          error: 'Token Invalid'
        })
      }

      const now = new Date();

      if (now > usuario.senhaResetarExpira) {
        return res.status(400).send({
          error: 'Cannot reset password, try again'
        })
      }

      usuario.senha = bcrypt.hashSync(senha, encript.passwordHash)
      usuarioCriacao.senha = undefined;
      usuario.senhaResetarToken = undefined
      usuario.senhaResetarExpira = undefined

      await usuario.save()
      res.status(200).send({
        usuario
      })

    } catch (err) {
      res.status('400').send({
        error: 'Erro on reset password, try again'
      })
    }
  },
}

module.exports = authController


