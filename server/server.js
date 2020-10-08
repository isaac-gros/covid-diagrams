const cors = require("cors");
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
app.use(cors());
app.use('/assets', express.static('public'))
app.use('/node_modules', express.static('node_modules'))

/**
 * GET
 */

function sortByAsc(array) {
	return array.sort((a, b) => {
		return a.department_name.localeCompare(b.department_name)
	});
}

// Get all stats and state
app.get('/', async (req, res) => {
	let arr = []
	// Instance of class
	let stats = await Stats.getAll()
	let state = await State.getAll()

	for (let value of Object.values(state.Items)) {
		arr.push({
			'department_id': value.department_id,
			'department_name': value.department_name
		})
	}

	arr = sortByAsc(arr)

	res.render('./../client/index.ejs', {
		stats: stats,
		state: arr
	})
});

// Get the last info has been asked
app.get('/update/:date_stat/:department_code', async (req, res) => {

	let datePattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/
	let departmenPattern = /^(DEP|REG|)-([0-9]{2}|2(A|B)|97[1-4])$/

	if(req.params.date_stat.match(datePattern) && req.params.department_code.match(departmenPattern)) {
		// Find an item
		try {
			let arr = [];
			let infos = await Stats.findByInfos(req.params.date_stat, req.params.department_code);

			if (infos.Items.length > 0) {
				// Make an array with graph infos
				infos.Items.forEach(item => {
					arr.push([
						item.hospitalize_count,
						item.intensive_care_count,
						item.new_hospitalize_count,
						item.new_intensive_care_count,
						item.death_count,
						item.heal_count
					])
				});

				res.status(200).send({ array: arr[0]});
			} else {
				console.error('No items found with request parameters ' + JSON.stringify(req.params, undefined))
				res.status(204).send({err: 'No items found'});
			}

		} catch (error) {
			console.error(error)
			res.status(500).send({err: error})
		}
	} else {
		let message = 'Excepted format YYYY-MM-DD for date '
		message += 'and format DEP_TYPE-NUMBER (eg: DEP-75) for department, '
		message += 'got : ' + JSON.stringify(req.params, undefined)
		res.status(400).send({err: message})
	}
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
		Stats.create(object, function (data) {
			if (Object.values(data).length > 0) {
				let result = []
				result.push([
					data.hospitalize_count,
					data.intensive_care_count,
					data.new_hospitalize_count,
					data.new_intensive_care_count,
					data.death_count,
					data.heal_count
				])

				res.status(200).send({ array: result[0]});
			} else {
				console.error('No items found with request parameters ' + JSON.stringify(req.params, undefined))
				res.status(204).send({err: 'No items found'});
			}
		})
	} catch (error) {
		console.error(error)
		res.status(500).send({err: error})
	}

})

app.listen(port, function() {
	console.log('Server is running on port ' + port)
})