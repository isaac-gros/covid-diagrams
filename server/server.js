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
app.use('/assets', express.static('public'))
app.use('/node_modules', express.static('node_modules'))

/**
 * GET
 */

// Get all stats and state
app.get('/', async (req, res) => {
	// Instance of class
	let stats = await Stats.getAll()
	let state = await State.getAll()
	// Find an item
	let findByInfos = await Stats.findByInfos("2020-01-01", "DEP-75");
	console.log(findByInfos)

	res.render('./../client/index.ejs', {
		stats: stats,
		state: state
	})
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
		department_name: req.body.department_name,
		hospitalize_count: req.body.hospitalize_count,
		new_intensive_care_count: req.body.new_intensive_care_count,
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		department_code: req.body.department_code,
		date_stat: req.body.date_stat,
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