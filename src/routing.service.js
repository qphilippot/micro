const Singleton = require("./singleton.pattern");
const Route = require('./route.model');

class RoutingService {
    /**
     * @param {Object} app
     * @param {Route[]} router
     **/
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

    generateRoutesFromYaml(routesYaml, context) {
        return Object.keys(routesYaml).map(routeName => {
            const routeData = routesYaml[routeName];

            let action = context.actions[routeData.action];

            if (action === undefined) {
                throw new Error('The following action cannot be found : ' + routeData.action);
            }

            return new Route({
                name: routeName,
                path: routeData.path,
                middlewares: routeData.middlewares || [],
                action
            });
        });
    }

    fromYAML(routesYaml, context, app) {
        this.use(
            app,
            this.generateRoutesFromYaml(
                routesYaml,
                context
            )
        );
    }
}

module.exports = Singleton.create(RoutingService);