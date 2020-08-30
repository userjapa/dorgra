const fs = require('fs')

const apiRoute = require('./route/api')

module.exports = (req, res) => {
  if (req.url == '/favicon.ico') {
    fs.readFile('./favicon.ico', (err, data) => {
      if (err) {
        res.write('Error')
        res.end()
      }

      res.end(data);
    })
  } else if (req.url.match('/api') && req.url.match('/api').index == 0) {
     apiRoute(req, res)
  } else {
    fs.readFile('./public/index.html', (err, data) => {
      if (err) {
        res.write('Error')
        res.end()
      }

      res.end(data);
    })
  }
}
