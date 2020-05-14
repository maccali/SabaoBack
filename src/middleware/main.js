var middleware = {
  logger: function (req, res, next) {
    console.log(
      `Route received ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
  },
  errorHand: function (data) {
    if (data.err) {
      data.res.statusCode = 500
      data.res.send({
        status: 500,
        massage: 'Algum erro Interno Ocorreu',
      })
    } else {
      data.res.statusCode = 404
      data.res.send({
        status: 404,
        massage: 'Algum erro Interno Ocorreu',
      })
    }
    // console.log(data.err)
    console.log(`o status code é: ${data.res.statusCode}`)
    data.res.send({
      massage: 'Oi',
    })
  },
  auth: function (req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.send(401).send({
        error: 'No token provided',
      })
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
      return res.status(401).send({
        error: 'Token error',
      })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({
        error: 'Token malformatted',
      })
    }
  },
}

module.exports = middleware
