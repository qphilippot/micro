const Singleton = require("./singleton.pattern");

class RoutingService extends Singleton {
    use(app, router) {
        router.forEach(route => {
            const method = (route.method || 'get').toLowerCase();
            const middlewares = route.middlewares || [];


            if (typeof route.path !== 'string') {
                throw `No path found for ${JSON.stringify(route)}`;
            }

            if (typeof route.action !== 'function') {
                throw `Invalid action for ${JSON.stringify(route)}`;
            }

            app[method](route.path, middlewares, route.action);
        });
    }
}

module.exports = Singleton.create(RoutingService);