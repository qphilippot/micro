const path = require('path');

class ControllerLoaderService {
    fromYaml(controllerYaml, container) {
        Object.keys(controllerYaml).forEach(name => {
            const controllerData = controllerYaml[name];
            let type;

            if (typeof controllerData === 'string') {
                if (controllerData.length > 1 && controllerData[0] === '@') {
                    type = require(path.resolve(container.projectRoot, controllerData.slice(1)));
                }
            }

            else {
                if (typeof controllerData.class === 'string') {
                    if (controllerData.class.length > 1 && controllerData.class[0] === '@') {
                        type = require(path.resolve(__dirname, controllerData.class.slice(1)));
                    }
                }
            }

            const controller = new type();
            container.controllers[name] = controller;

            controller.getActions().forEach(propertyName => {
                if (typeof controller[propertyName] === 'function') {
                    container.actions[name + '.' + propertyName] = controller[propertyName].bind(controller);
                }
            });
        });

        return container;
    }
}

module.exports = ControllerLoaderService;