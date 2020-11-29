const Singleton = require("./singleton.pattern");



class CookieService {
    buildCookies(request) {
        if (
            typeof request.headers !== 'undefined' &&
            typeof request.headers.cookie === 'undefined'
        ) {
            if (typeof request.__micro === 'undefined') {
                request.__micro = {};
            }

            if (typeof request.__micro.cookies === 'undefined') {
                request.__micro.cookies = {};
            }
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

    get(request = {}, name = 'a_cookie_name') {
        if (
            typeof request.__micro === 'undefined' ||
            typeof request.__micro.cookies === 'undefined'
        ) {
            this.buildCookies(request);
        }

        return request.__micro.cookies[name] || null;
    }

    set(response, name, value, options = {}) {
        response.cookie(
            name,
            value,
            options
        );
    }
}

module.exports = Singleton.create(CookieService);