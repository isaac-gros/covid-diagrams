let AWS = require('../../config/config')

const docClient = new AWS.DynamoDB.DocumentClient();
let params = {
	TableName: 'Stats'
};



class Stats {
	/**
	 * Create new item
	 */
    static create (object, callback) {
		params.Item = object
		delete params.FilterExpression
		delete params.ExpressionAttributeValues

		docClient.put(params, function(err, data) {
			if (err) {
				console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				callback(params.Item);
			}
		});
    }


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

	/**
     * Find the last item one
     */
	static async findLastOne() {
		params.ScanIndexForward = false
		params.Limit = 1
		try {
			let result = await docClient.scan(params).promise();
			return result
		} catch (err) {
			console.error("There was a problem recovering : ", err)
		}
	}


	/**
     * Find item by date and state
     */
	static async findByInfos(date_stat, department_code) {
		params.FilterExpression = 'date_stat = :date_stat AND department_code = :department_code',
		params.ExpressionAttributeValues = {
			":date_stat": date_stat,
			":department_code": department_code
		}

		try {
			let result = await docClient.scan(params).promise();
			return result
		} catch (err) {
			console.error("There was a problem recovering : ", err)
		}
	}

}

module.exports = Stats