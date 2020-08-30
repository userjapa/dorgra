module.exports = {
  sendError(res, message = '') {
    res.setHeader('Content-Type', 'application/json')

    res.write(JSON.stringify({ success: false, message }))
    res.end()
  }
}
