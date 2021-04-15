import {addStaticObject, removeStaticObject, addMovingObject, removeMovingObject} from './collision-manager';

function rectOverlapsRect(rect1, rect2) {
    const leftSide1 = rect1.x;
    const rightSide1 = rect1.x + rect1.width;
    const bottomSide1 = rect1.y;
    const topSide1 = rect1.y + rect1.height;

    const leftSide2 = rect2.x;
    const rightSide2 = rect2.x + rect2.width;
    const bottomSide2 = rect2.y;
    const topSide2 = rect2.y + rect2.height;

    const horizontal = (leftSide2 <= leftSide1 && leftSide1 <= rightSide2) || (leftSide2 <= rightSide1 && rightSide1 <= rightSide2);
    const vertical = (bottomSide2 <= bottomSide1 && bottomSide1 <= topSide2) || (bottomSide2 <= topSide1 && topSide1 <= topSide2);

    if (horizontal && vertical) {
        rect1.onImpact(rect2);
        rect2.onImpact(rect1);
    }
    return horizontal && vertical;
}

function circleOverlapsCircle(circ1, circ2) {
    const sumRadius = circ1.r + circ2.r;
    const distance = Math.sqrt((circ1.x - circ2.x)**2 + (circ2.y - circ2.x)**2);

    return distance <= sumRadius;
}

function circleOverlapsRect(circle, rect) {
    // TODO need to implement
    console.log('NOT YET IMPLEMENTED: CIRCLE OVERLAPS RECT');
    return false;
}

class Collider {
    constructor(isMoving) {
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.isMoving = isMoving;
        this.impactListeners = [];
    }

    get x() {
        return this.parent.x;
    }

    get y() {
        return this.parent.y;
    }

    onCreate(parent) {
        this.parent = parent;
        if (this.isMoving) {
            addMovingObject(this);
        }
        else {
            addStaticObject(this);
        }
    }

    onDestroy(parent) {
        if (this.isMoving) {
            removeMovingObject(this);
        }
        else {
            removeStaticObject(this);
        }
    }
    
    update(deltaTime) {
        this.parent.x += deltaTime * this.xVelocity;
        this.parent.y += deltaTime * this.yVelocity;
    }

    onImpact(other) {
        this.impactListeners.forEach(listener => {
            listener();
        });
    }

    addImpactListener(func) {
        this.impactListeners.push(func);
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

    update(deltaTime) {
        super.update([deltaTime]);
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