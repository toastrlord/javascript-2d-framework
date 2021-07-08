class Trigger {
    constructor(predicate, callback) {
        this.predicate = predicate;
        this.callback = callback;
    }

    update() {
        if (this.predicate()) {
            this.callback();
        }
    }

    onCreate(parent) {
        this.parent = parent;
    }
}

export default Trigger;