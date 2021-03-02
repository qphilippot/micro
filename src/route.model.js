const METHOD_ALLOWED = ['get', 'post', 'put', 'delete'];

class Route {
    constructor(settings = {}) {
        /** @type {string} **/
        this.method = settings.method;

        /** @type {string} **/
        this.name = settings.name;

        /** @type {string} **/
        this.path = settings.path;

        /** @type {Function[]} **/
        this.middlewares = settings.middlewares || [];

        /** @type {Function} **/
        this.action = settings.action;

        this.checkValidity();
    }

    checkValidity() {
        if (
            typeof this.method !== 'string' ||
            METHOD_ALLOWED.includes(this.method) === false
        ) {
            throw 'invalid method';
        }
    }
}

module.exports = Route;