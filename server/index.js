const express = require('express')
const port = 8080

let app = express()

// Main Route
app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port)