import GameObject from './game-object';

const gameObjectDictionary = {};
let gameObjects = [];
let nextID = 0;
const availableIDs = [];

/**
 * Get all the current game objects
 * @returns {[GameObject]}  
 */
function getGameObjects() {
    gameObjects = [];
    Object.keys(gameObjectDictionary).forEach(key => {
        gameObjects.push(gameObjectDictionary[key]);
    });
    
    return gameObjects;
}
/**
 * Delete this game object from the dictionary
 * @param {*} gameObject 
 */
function removeGameObject(gameObject) {
    gameObject.onDelete();
    delete gameObjectDictionary[gameObject.id];
    availableIDs.push(gameObject.id);
}

/**
 * Creates a gameObject, assigns it an id and adds it to the gameObjectDictionary
 * @param {GameObject} gameObject 
 */
function addGameObject(gameObject) {
    let id;
    if (availableIDs.length === 0) {
        id = nextID;
        nextID += 1;
    }
    else {
        id = availableIDs.pop();
    }
    gameObject.id = id;
    gameObjectDictionary[gameObject.id] = gameObject;
}

export {getGameObjects, removeGameObject, addGameObject}