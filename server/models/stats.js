let AWS = require('../../config/config')

const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
	TableName: 'Stats'
};



class Stats {
	/**
     * Get all stats
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