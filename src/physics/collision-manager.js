const movingObjects = [];
const staticObjects = []; // more like kinematic objects, since they can't be moved via the collision manager?

// TODO: currently assumes that moving objects cannot interact with each other, only static objects 
// also only processes a single collision event

// TODO: not good! scales up by O(m*n), where m and n are the lengths of movingobjects and staticobjects arrays, respectively
function checkForCollisions() {
    movingObjects.forEach(mover => {
        staticObjects.forEach(staticObj => {
           if (mover.checkCollision(staticObj)) {
               const moverCenter = {x: mover.parent.x + mover.width / 2, y: mover.parent.y + mover.height / 2};
               const staticCenter = {x: staticObj.parent.x + mover.height / 2, y: staticObj.parent.y + staticObj.height / 2};
               const moverBottom = mover.parent.y;
               const moverTop = mover.parent.y + mover.height;
               const moverLeft = mover.parent.x;
               const moverRight = mover.parent.x + mover.width;

               const staticBottom = staticObj.parent.y;
               const staticTop = staticObj.parent.y + staticObj.height;
               const staticLeft = staticObj.parent.x;
               const staticRight = staticObj.parent.x + staticObj.width;

               const aboveDist = moverBottom - staticTop;
               const belowDist = staticBottom - moverTop;
               const leftDist = moverRight - staticLeft;
               const rightDist = staticRight - moverLeft;

               const distX = Math.min(
                   Math.abs(leftDist), 
                   Math.abs(rightDist));
               const distY = Math.min(
                   Math.abs(aboveDist), 
                   Math.abs(belowDist));

               //top/bottom collision
               if (distY < distX) {
                   mover.yVelocity = -mover.yVelocity;
                   mover.xVelocity = mover.xVelocity + staticObj.xVelocity;
                   
                   if (Math.abs(aboveDist) < Math.abs(belowDist)) {
                    mover.parent.y = staticObj.parent.y + staticObj.height;
                   } else {
                    mover.parent.y = staticObj.parent.y - mover.height;
                   }
               } else { //otherwise must be horizontal collision
                    mover.xVelocity = -mover.xVelocity;
                    mover.yVelocity = mover.yVelocity + staticObj.yVelocity;
                    if (Math.abs(leftDist) < Math.abs(rightDist)) {
                        mover.parent.x = staticObj.parent.x - mover.width;
                    } else {
                        mover.parent.x = staticObj.parent.x + staticObj.width;
                    }
               }
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