const Singleton = require('../singleton.pattern');
const DBHelperNotFoundException = require('./DBHelperNotFound.exception');

class DBHelper {
    constructor() {
        this.helpers = {
            [DBHelper.DB_TYPE.DYNAMO]: require('./helpers/dynamo.helper')
        };

        this.DB_TYPE = { ...DBHelper.DB_TYPE };
    }

    /**
     * @param {DBHelper.DB_TYPE} db_type 
     * @param {Object} connexionData 
     */
    connect(db_type, connexionData) {
        const helper = this.helpers[db_type];

        if (
            typeof helper !== 'undefined' &&
            typeof helper.connect === 'function'
        ) {
            return helper.connect(connexionData);
        }

        else {
            throw new DBHelperNotFoundException(db_type || 'undefined');
        }

    }
}

/**
 * @enum {string}
 */
DBHelper.DB_TYPE = {
    DYNAMO: 'dynamo',
    MONGO: 'mongo'
};

module.exports = Singleton.create(DBHelper);