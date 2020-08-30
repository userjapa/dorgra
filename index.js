const http = require('http')

const server = require('./server')

const app = http.createServer(server)

app.listen(8080, () => {
  console.log(`Running at port 8080`)
})
