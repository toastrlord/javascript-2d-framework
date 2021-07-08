class GameObject {
    constructor(x, y) {
        // id to be assigned when added to game object manager
        this.id = NaN;
        this.x = x;
        this.y = y;
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
        component.onCreate(this);
    }

    removeComponent(component) {
        if (component.hasOwnProperty('onRemove')) {
            component.onRemove(this);
        }
        this.components.splice(this.components.indexOf(component), 1);
    }

    onDelete() {
        this.components.forEach(c => {
            if (c.onDelete) {
                c.onDelete();
            }
        });
    }

    update(deltaTime) {
        this.components.forEach(component => {
            component.update(deltaTime);
        });
    }
}

export default GameObject;