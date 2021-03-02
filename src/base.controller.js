class BaseController {
    constructor(settings) {
        this.services = settings.services || {};
        
        if (typeof this.services.cookies === 'undefined') {
            this.services.cookies = require('./cookie.service');
        }
    }

    getActions() {
        let props = [];
        let obj = this;
        do {
            props = props.concat(Object.getOwnPropertyNames(obj));
        } while ((obj = Object.getPrototypeOf(obj)) && obj !== BaseController.prototype);

        return props.sort().filter((e, i, arr) => {
            if (e!=arr[i+1] && typeof this[e] == 'function') return true;
        });
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