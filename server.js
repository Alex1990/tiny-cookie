import fs from 'fs'
import http from 'http'
import https from 'https'
import express from 'express'

const privateKey = fs.readFileSync('ssl/server.pem', 'utf8')
const certificate = fs.readFileSync('ssl/server.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }

const app = express()
const HTTP_PORT = 8080
const HTTPS_PORT = 8443

app.use(express.static('.'))

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(HTTP_PORT, () => {
  console.log('Server listening on 127.0.0.1:%d', HTTP_PORT)
})
httpsServer.listen(HTTPS_PORT, () => {
  console.log('Server listening on 127.0.0.1:%d', HTTPS_PORT)
})
