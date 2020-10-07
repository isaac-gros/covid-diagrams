require('dotenv').config()
const AWS = require('aws-sdk');

const config = {
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	region: process.env.REGION,
}

AWS.config.update(config);
module.exports = AWS