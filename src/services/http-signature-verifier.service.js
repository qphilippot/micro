const httpSignature = require('http-signature');

class HTTPSignatureVerifierService {
    constructor() {
        this.publicKey = null;
    }

    verify(request, key = null) {
        const parsedRequest = httpSignature.parseRequest(request, undefined);
        return httpSignature.verifySignature(parsedRequest, key === null ? this.publicKey : key);
    }

    static async create(settings = {
        publicKeyProvider: undefined
    }) {
        const service = new HTTPSignatureVerifierService(settings);

        if (typeof settings.publicKeyProvider === 'function') {
            service.publicKey = await settings.publicKeyProvider();
        } else if (
            typeof settings.publicKeyProvider !== 'undefined' &&
            typeof settings.publicKeyProvider.provide === 'function'
        ) {
            service.publicKey = await settings.publicKeyProvider.provide();
        }
    }
}

module.exports = HTTPSignatureVerifierService;