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

		docClient.put(params, function(err, data) {
			if (err) {
				console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				callback(JSON.stringify(data, null, 2));
			}
		});
    }


	/**
     * Get all items
     */
    static all (callback) {
        docClient.scan(params, function (err, data) {
			if (err) {
				console.log("error : ", err)
			} else {
				callback(data)
			}
		});
    }

}

module.exports = Stats