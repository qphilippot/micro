const httpSignature = require('http-signature');

class HTTPSignatureSignerService {
    constructor(settings = {}) {
        this.keyName = settings.keyName || 'unknown';
        this.secret = null;

        this.headers = settings.headers || [];

        // useless for now, maybe used in next versions
        // this.signPayload = typeof settings.signPayload === 'undefined' ? true : settings.signPayload;

        this.signer = httpSignature;
        this.options = {
            key: settings.key || null,
            keyId: this.keyName
        };

        if (typeof this.secret === 'string') {
            this.options.keyPassphrase = this.secret;
        }
    }

    setKey(key) {
        this.options.key = key;
    }

    sign(request) {
        this.signer.sign(request, this.options);
    }

    static async create(settings = {}) {
        const service = new HTTPSignatureSignerService(settings);

        if (typeof settings.privateKeyProvider === 'function') {
            service.setKey(await settings.privateKeyProvider());
        } else if (
            typeof settings.privateKeyProvider !== 'undefined' &&
            typeof settings.privateKeyProvider.getKey === 'function'
        ) {
            service.setKey(await settings.privateKeyProvider.getKey());
        }

        return service;
    }
}

module.exports = HTTPSignatureSignerService;