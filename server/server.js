const express = require('express')

const port = 8080
let app = express()
let Stats = require('./models/stats')

// Set templating
app.set('view engine', 'ejs')
app.set('trust proxy', 1)

// Main route
app.get('/', (req, res) => {
	Stats.all( function (stats) {
        res.render('./../client/base.ejs', {
			stats: stats
		})
    })

})

app.listen(port)