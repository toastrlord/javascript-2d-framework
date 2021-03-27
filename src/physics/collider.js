function rectOverlapsRect(rect1, rect2) {
    // TODO TESTME!!!
    if (rect1.x >= rect2.x && rect1.x <= rect2.x + rect2.width) {
        return (rect1.y >= rect2.y && rect1.y <= rect2.y + rect2.height) || 
        (rect1.y + rect1.height >= rect2.y && rect1.y + rect1.height <= rect2.y + recy2.height);
    }
    if (rect1.x + rect1.width >= rect2.x && rect1.x + rect1.width <= rect2.x + rect2.width) {
        return (rect1.y >= rect2.y && rect1.y <= rect2.y + rect2.height) || 
        (rect1.y + rect1.height >= rect2.y && rect1.y + rect1.height <= rect2.y + recy2.height);
    }

    return false;
}

function circleOverlapsCircle(circ1, circ2) {
    const sumRadius = circ1.r + circ2.r;
    const distance = Math.sqrt((circ1.x - circ2.x)**2 + (circ2.y - circ2.x)**2);

    return distance <= sumRadius;
}

function circleOverlapsRect(circle, rect) {
    // TODO need to implement

    return false;
}

class Collider {
    constructor(isMoving) {
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.isMoving = isMoving;
    }

    onCreate(parent) {
        this.parent = parent;
        this.x = parent.x;
        this.y = parent.y;
        if (isMoving) {
            addMovingObject(this);
        }
        else {
            addStaticObject(this);
        }
    }

    onDestroy(parent) {
        if (isMoving) {
            removeMovingObject(this);
        }
        else {
            removeStaticObject(this);
        }
    }

    update(deltaTime) {
        parent.x += deltaTime * this.xVelocity;
        parent.y += deltaTime * this.yVelocity;
    }
}

class RectCollider extends Collider {
    constructor(width, height, isMoving) {
        super(isMoving);
        this.width = width;
        this.height = height;
    }

    checkCollision(other) {
        if (other instanceof CircleCollider) {
            return circleOverlapsRect(other, this);
        }
        if (other instanceof RectCollider) {
            return rectOverlapsRect(this, other);
        }
    }
}

class CircleCollider extends Collider{
    constructor(radius, isMoving) {
        super(isMoving);
        this.radius = radius;
    }

    checkCollision(other) {
        if (other instanceof CircleCollider) {
            return circleOverlapsCircle(this, other);
        }
        if (other instanceof RectCollider) {
            return circleOverlapsRect(this, other);
        }
    }
}

export {RectCollider, CircleCollider};