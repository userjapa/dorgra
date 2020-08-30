const boletoRoute = require('./boleto')

const { sendError } = require('./../../../util')

module.exports = (req, res) => {
  if (req.url.match('/boleto') && req.url.match('/boleto').index == 4) {
    boletoRoute(req, res)
  } else {
    sendError(res, 'Route not exists')
  }
}
