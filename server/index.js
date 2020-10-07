const express = require('express')
const port = 8080
let app = express()

// Set templating
app.set('view engine', 'ejs')
app.set('trust proxy', 1)

// Main route
app.get('/', (req, res) => {
	res.render('./../client/index.ejs')
})

app.listen(port)