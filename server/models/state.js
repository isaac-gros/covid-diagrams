let AWS = require('../../config/config')

const docClient = new AWS.DynamoDB.DocumentClient();
let params = {
	TableName: 'Department'
};

class State {
	/**
     * Get all items
     */
    static async getAll() {
		try {
			let result = await docClient.scan(params).promise();
			return result
		} catch (err) {
			console.error("There was a problem recovering : ", err)
		}
	}

}

module.exports = State