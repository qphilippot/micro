const BaseController = require('./src/base.controller');
const MicroService = require('./src/microservice');
const RoutingService = require('./src/routing.service');
const Singleton = require('./src/singleton.pattern');
const DBHelper = require('./src/DBHelper/db.helper');

module.exports = {
    BaseController,
    MicroService,
    RoutingService,
    Singleton,
    DBHelper
};