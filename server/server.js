const express = require('express')
const { v4: uuidv4 } = require('uuid');

const port = 8080
let app = express()
let bodyParser = require('body-parser')
let Stats = require('./models/stats')
let State = require('./models/state')

// Set templating
app.set('view engine', 'ejs')
app.set('trust proxy', 1)

// Set Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * GET
 */

// Get all stats and state
app.get('/', (req, res) => {
	Stats.all( function (stats) {
		State.all( function (state) {
			res.render('./../client/base.ejs', {
				stats: stats,
				state: state
			})
		});
	});
});

/**
 * POST
 */

// Create a new stat item
app.post('/', (req, res) => {
	// Create the request object
	let object = {
		stat_id: uuidv4(),
		death_count: req.body.death_count,
		heal_count: req.body.heal_count,
		new_hospitalize_count: req.body.new_hospitalize_count,
		source: req.body.source,
		state_name: req.body.state_name,
		hospitalize_count: req.body.hospitalize_count,
		new_intensive_care_count: req.body.new_intensive_care_count,
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		state_code: req.body.state_code,
		date: req.body.date,
		intensive_care_count: req.body.intensive_care_count
	}

	try {
		Stats.create(object, function () {
			res.redirect('/')
		})
	} catch (e) {
		console.error(e)
	}

})

app.listen(port)