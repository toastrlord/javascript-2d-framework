const movingObjects = [];
const staticObjects = []; // more like kinematic objects, since they can't be moved via the collision manager?

// TODO: currently assumes that moving objects cannot interact with each other, only static objects 
// also only processes a single collision event

function checkForCollisions() {
    movingObjects.forEach(mover => {
        staticObjects.forEach(staticObj => {
           if (mover.checkCollision(staticObj)) {
           } 
        });
    });
}

function addObject(array, obj) {
    array.push(obj);
}

function removeObject(array, obj) {
    array.splice(array.indexOf(obj), 1);
}

function addStaticObject(staticObj) {
    addObject(staticObjects, staticObj);
}

function addMovingObject(movingObj) {
    addObject(movingObjects, movingObj);
}

function removeStaticObject(staticObj) {
    removeObject(staticObjects, staticObj);
}

function removeMovingObject(movingObj) {
    removeObject(movingObjects, movingObj);
}

export {addMovingObject, removeMovingObject, addStaticObject, removeStaticObject, checkForCollisions}