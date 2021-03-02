class Container {
    constructor() {
        /** @type {string} **/
        this.projectRoot = '';

        /** @type {{ string: BaseController }} **/
        this.controllers = {};

        /** @type {{ string: Object }} **/
        this.services = {};

        /** @type {{ string: Function }} **/
        this.actions = {};
    }
}

module.exports = Container;