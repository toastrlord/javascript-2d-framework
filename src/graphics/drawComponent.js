const { drawRectangle } = require("./primitive-shapes");

class DrawRectangleComponent {
    constructor(width, height, color, depth) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.depth = depth;
    }

    get x() {
        return this.parent.x;
    }

    get y() {
        return this.parent.y;
    }

    update(deltaTime) {
        drawRectangle(this.x, this.y, this.x + this.width, this.y + this.height, this.color, this.depth);
    }
    
    onCreate(parent) {
        this.parent = parent;
    }
}

export default DrawRectangleComponent;