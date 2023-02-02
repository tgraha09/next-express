const express = require('express')
const router = require('./router')
const app = express()
const favicon = require('express-favicon');

app.use(express.json())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

router(app)

app.listen(3000)