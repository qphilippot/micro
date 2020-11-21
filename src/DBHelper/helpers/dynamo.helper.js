const Singleton = require('../../singleton.pattern');
const dynamoose = require('dynamoose');

class DynamoHelper {
    /**
     * @param {Object} connexionData 
     * @param {string} connexionData.accessKeyId 
     * @param {string} connexionData.secretAccessKey 
     * @param {string} connexionData.region 
     */
    connect(connexionData) {
        // Create new DynamoDB instance
        const db = new dynamoose.aws.sdk.DynamoDB(connexionData);

        // Set DynamoDB instance to the Dynamoose DDB instance
        dynamoose.aws.ddb.set(ddb);
        return db;
    }
}

module.exports = Singleton.create(DynamoHelper);