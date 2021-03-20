import KeyBindContainer from 'input/keybinds';

const keyBinds = {};
keyBinds['keydown'] = new KeyBindContainer();
keyBinds['keyup'] = new KeyBindContainer();

/**
 * Add a key bind, performing this action in addition to any other actions that might be happening for this key
 * @param {string} type 
 * @param {string} key 
 * @param {function} action
 */
function addKeyBind(type, key, action) {
    keyBinds[type].addKeyBind(key, action);
}

/**
 * Add a key bind, replacing any action previously bound to this key
 * @param {string} type 
 * @param {string} key 
 * @param {function} action 
 */
function replaceKeyBind(type, key, action) {
    keyBinds[type].replaceKeyBind(key, action);
}

/**
 * Remove the action associated with this key
 * @param {string} type 
 * @param {string} key 
 */
function clearKeyBind(type, key) {
    keyBinds[type].clearKeyBind(key);
}

/**
 * Clear all keybinds for this type
 * @param {string} type 
 */
function clearAllKeyBinds(type) {
    keyBinds[type].clearAllKeyBinds();
}

/**
 * Listen for events from the window for all registered KeyBindContainers
 * @param {string} type 
 */
function listenForEvents(type) {
    window.addEventListener(type, (e) => {
        keyBinds[type].performKeyAction(e.key.toLowerCase());
    });
}


// listen for events when this module is loaded
Object.keys(keyBinds).forEach(type => {
    listenForEvents(type);
});

export {clearAllKeyBinds, clearKeyBind, addKeyBind, replaceKeyBind};
