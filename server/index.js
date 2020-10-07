const express = require('express')
const port = 8080
let app = express()

// Set templating
app.set('view engine', 'ejs')
app.set('trust proxy', 1)

// Main route
app.get('/', (req, res) => {
	res.render('./../client/index.ejs', {
		text_try: "salut les gens !!"
	})
})

app.listen(port)