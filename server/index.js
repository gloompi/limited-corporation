const express = require('express')
const webpack = require('webpack')
const https = require('https')
const fs = require('fs')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../webpack/client.dev')
const serverConfig = require('../webpack/server.dev')
const {port} = require('../config')
const privateKey = fs.readFileSync('/etc/nginx/ssl/cryptoinvest.key')
const certificate = fs.readFileSync('/etc/nginx/ssl/cryptoinvest.crt')
const credentials = {
  key: privateKey,
  cert: certificate
}

const app = express()

const compiler = webpack([clientConfig, serverConfig])
const clientCompiler = compiler.compilers[0]
const publicPath = clientConfig.output.publicPath
const options = { 
  publicPath, 
  stats: { colors: true }
}

app.use(webpackDevMiddleware(compiler, options))
app.use(webpackHotMiddleware(clientCompiler))
app.use(webpackHotServerMiddleware(compiler))

https.createServer(credentials, app).listen(
  port,
  () => console.log('started on', port)
)