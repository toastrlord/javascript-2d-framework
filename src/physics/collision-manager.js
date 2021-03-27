const movingObjects = [];
const staticObjects = [];

function rectOverlapsRect(rect1, rect2) {
    if (rect1.x >= rect2.x && rect1.x <= rect2.x + rect2.width) {
        return true;
    }
    if (rect1.x + rect1.width >= rect2.x && rect1.x + rect1.width <= rect2.x + rect2.width) {
        return true;
    }
    if (rect1.y >= rect2.y && rect1.y <= rect2.y + rect2.height) {
        return true;
    }
    if (rect1.y + rect1.height >= rect2.y && rect1.y + rect1.height <= rect2.y + recy2.height) {
        return true;
    }

    return false;
}

function circleOverlapsCircle(circ1, circ2) {
    const sumRadius = circ1.r + circ2.r;
    const distance = Math.sqrt((circ1.x - circ2.x)**2 + (circ2.y - circ2.x)**2);
    return distance <= sumRadius;
}

// TODO: currently assumes that moving objects cannot interact with each other, only static objects 

function checkForCollisions() {
    movingObjects.forEach(mover => {
        staticObjects.forEach(staticObj => {
           if (rectOverlapsRect(mover, staticObj)) {
               // handle collision
           } 
        });
    });
}