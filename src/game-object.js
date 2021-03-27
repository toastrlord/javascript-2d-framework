class GameObject {
    constructor() {
        // id to be assigned when added to game object manager
        this.id = NaN;
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
        component.onCreate();
    }

    removeComponent(component) {
        component.onRemove();
        this.components.splice(this.components.indexOf(component), 1);
    }
}

export default GameObject;