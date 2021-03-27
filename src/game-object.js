class GameObject {
    constructor(x, y) {
        // id to be assigned when added to game object manager
        this.id = NaN;
        this.x = x;
        this.y = y;
        this.components = [];
    }

    set x(newX) {
        this.x = newX;
    }

    set y(newY) {
        this.y = newY;
    }

    get x(){
        return this.x;
    }

    get y() {
        return this.y;
    }

    addComponent(component) {
        this.components.push(component);
        if (component.hasOwnProperty('onCreate')) {
            component.onCreate(this);
        }
    }

    removeComponent(component) {
        if (component.hasOwnProperty('onRemove')) {
            component.onRemove(this);
        }
        this.components.splice(this.components.indexOf(component), 1);
    }

    update(deltaTime) {
        this.components.forEach(component => {
            if (component.hasOwnProperty('update')) {
                component.update(deltaTime);
            }
        });
    }
}

export default GameObject;