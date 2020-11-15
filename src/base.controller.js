/**
 * Looks like private static method
 */

function buildCookies(request) {
    if (
        typeof request.headers !== 'undefined' &&
        typeof request.headers.cookie === 'undefined'
    ) {
        request.microservice_cookies = {};
    }

    else {
        // https://alligator.io/nodejs/express-cookies/
        const rawCookies = request.headers.cookie.split('; ');
        const parsedCookies = {};
        rawCookies.forEach(rawCookie => {
            const parsedCookie = rawCookie.split('=');
            parsedCookies[parsedCookie[0]] = parsedCookie[1];
        });

        request.microservice_cookies = parsedCookies;
    }
}


class BaseController {
    constructor(settings) {
        this.services = settings.services || {};
    }

    getMethod(methodName) {
        if (typeof this[methodName] === 'function') {
            return this[methodName].bind(this);
        }
    }

    getCookie(request = {}, name = 'a_cookie_name') {
        if (typeof request.microservice_cookies === 'undefined') {
            buildCookies(request);
        }

        return request.microservice_cookies[name] || null;
    }
}

module.exports = BaseController;