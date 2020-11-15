const singletonList = {};

class Singleton {
    constructor() {
        const name = this.constructor.name;
        if (typeof singletonList[name] !== 'undefined') {
           
           
            throw `Try to instanciate multiple time a singleton (${name})`;
        }
    }

    static create(type) {
        const name = type.constructor.name;
        let instance = singletonList[name] || null; 
        if (instance === null) {
            instance = new type();
            singletonList[name] = instance;
        }

        return instance;
    }

}

module.exports = Singleton;