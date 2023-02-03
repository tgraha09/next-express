const express = require('express')
const router = require('./router')
const { createServer } = require('http')
const { parse } = require('url')
const bodyParser = require('body-parser')
//const app = express()
const path = require('path')
const favicon = require('express-favicon');
const next = require('next')
const dev = process.env.NODE_ENV !== 'development';
const port = process.env.PORT || 3000;

const hostname = 'localhost'
//app.use(express.json())
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  //router(server, handle)
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

//router(app)

//app.listen(3000)