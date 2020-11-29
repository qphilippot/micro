class BaseController {
    constructor(settings) {
        this.services = settings.services || {};
        
        if (typeof this.services.cookies === 'undefined') {
            this.services.cookies = require('./cookie.service');
        }
    }

    getMethod(methodName) {
        if (typeof this[methodName] === 'function') {
            return this[methodName].bind(this);
        }
    }

    /**
     * @deprecated
     * @param {Request} request 
     * @param {string} name 
     */
    getCookie(request = {}, name = 'a_cookie_name') { 
        return this.services.cookies.get(request, name);
    }
}

module.exports = BaseController;