let AWS = require('../../config/config')

const docClient = new AWS.DynamoDB.DocumentClient();
let params = {
	TableName: 'Department'
};

class State {
	/**
     * Get all items
     */
    static all (callback) {
        docClient.scan(params, function (err, data) {
			if (err) {
				console.error("error : ", err)
			} else {
				callback(data)
			}
		});
    }

}

module.exports = State