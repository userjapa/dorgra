const fs = require('fs')

const apiRoute = require('./route/api')

module.exports = (req, res) => {
  if (req.url == '/favicon.ico') {
    return fs.readFile('./favicon.ico', (err, data) => {
      if (err) {
        res.write('Error')
        return res.end()
      }

      res.end(data);
    })
  } else if (req.url.match('/api') && req.url.match('/api').index == 0) {
     return apiRoute(req, res)
  } else {
    return fs.readFile('./public/index.html', (err, data) => {
      if (err) {
        res.write('Error')
        return res.end()
      }

      res.end(data);
    })
  }

  res.write('API valida boleto')
  res.end()
}
