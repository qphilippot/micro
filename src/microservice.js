const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');


class MicroService {
    constructor(settings = {}) {
        dotenv.config({
            path: settings.env
        });

        this.app = express();
        
        this.port = settings.port || process.env.PORT;

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
          }));
        this.app.use(helmet());
    }

    getMethod(methodName) {
        if (typeof this[methodName] === 'function') {
            return this[methodName].bind(this);
        }
    }
    
    start() {
        this.app.listen(this.port, () => {
            console.log(`${this.constructor.name} started on port ${this.port}`);
        });
    }

    buildCookies(request) {
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

    getCookie(request = {}, name = 'a_cookie_name') {
        if (typeof request.microservice_cookies === 'undefined') {
            this.buildCookies(request);
        }

        return request.microservice_cookies[name] || null;
    }
}

module.exports = MicroService;