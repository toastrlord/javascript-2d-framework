const { drawRectangle } = require("./primitive-shapes");

class DrawRectangleComponent {
    constructor(width, height, color, depth) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.depth = depth;
    }

    update(deltaTime) {
        drawRectangle(this.x, this.y, this.x + this.width, this.y + this.height, this.color, this.depth);
    }
    
    onCreate(parent) {
        this.x = parent.x;
        this.y = parent.y;
    }
}

export default DrawRectangleComponent;