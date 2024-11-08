const express = require('express')
const path = require('path')

const httpPort = 3000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/porshe', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/porshe.html'))
})

app.get('/ferrari', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/ferrari.html'))
})

app.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}!`)
})