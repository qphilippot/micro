class BaseController {
    constructor(settings) {
        this.services = settings.services || {};
    }

    getMethod(methodName) {
        if (typeof this[methodName] === 'function') {
            return this[methodName].bind(this);
        }
    }
}

module.exports = BaseController;