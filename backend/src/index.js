const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('[*] Server running on http://localhost:3333'))