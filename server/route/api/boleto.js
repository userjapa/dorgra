const { sendError } = require('./../../../util')

const boletoModule = require('./../../module/boleto')

module.exports = (req, res) => {
  if (req.url == '/api/boleto/validar') {
    if (req.method == 'POST') {
      const chunks = []

      req.on('data', data => {
        chunks.push(data)
      })

      req.on('end', () => {
        let result = null

        if (chunks.length) {
          const body = Buffer.concat(chunks).toString()

          const { boleto } = JSON.parse(body)

          result = boletoModule.validar(boleto)
        }

        res.setHeader('Content-Type', 'application/json')

        res.write(JSON.stringify({ success: !!result, data: result || {}, message: !result ? 'Not found': '' }))
        res.end()
      })
    } else {
      sendError(res, 'Method not supported')
    }
  } else {
    sendError(res, 'Route not exists')
  }
}
