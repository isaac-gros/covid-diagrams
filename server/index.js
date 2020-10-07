const express = require('express')
const port = 8080
let app = express()

// Load static styles
app.use('/assets', express.static('public'))
app.use('/node_modules', express.static('node_modules'))

// Set templating
app.set('view engine', 'ejs')
app.set('trust proxy', 1)

// Main route
app.get('/', (req, res) => {
	res.render('./../client/index.ejs')
})

app.listen(port)