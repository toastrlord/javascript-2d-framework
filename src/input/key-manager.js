const keyBinds = {}; // object key is the keyboard key, value is a no-arg function to be executed when that key is pressed

/**
 * Clear ALL currently registered key actions
 */
function clearAllKeyBinds() {
    Object.keys(keyBinds).forEach(key => {
        delete keyBinds[key];
    });
}

/**
 * Clear the action associated with this key (if any)
 * @param {string} key 
 */
function clearKeyBind(key) {
    delete keyBinds[key.toLowerCase];
}

function performKeyAction(key) {
    if (keyBinds[key] !== undefined) {
        keyBinds[key]();
    }
}

/**
 * Create a composite function, which executes f1 then f2
 * @param {function} f1 
 * @param {function} f2 
 */
function combineFunctions(f1, f2) {
    return () => {
        f1();
        f2();
    }
}

/**
 * Register this action to this key. Will be combined with any actions that are already there, with the new action being performed after the first
 * @param {string} key String of the key (will be matched to event.key)
 * @param {function} action 
 */
function addKeyBind(key, action) {
    let lowercaseKey = key.toLowerCase();
    if (keyBinds[lowercaseKey] === undefined) {
        keyBinds[lowercaseKey] = action;
    }
    else {
        keyBinds[lowercaseKey] = combineFunctions(keyBinds[lowercaseKey], action);
    }
}

/**
 * Register this action to this key, replacing any previous action
 * @param {string} key 
 * @param {function} action 
 */
function replaceKeyBind(key, action) {
    let lowercaseKey = key.toLowerCase();
    delete keyBinds[lowercaseKey];
    keyBinds[lowercaseKey] = action;
}

// listen for events when this module is loaded
window.addEventListener('keydown', (e) => {
    performKeyAction(e.key.toLowerCase());
});

export {clearAllKeyBinds, clearKeyBind, addKeyBind, replaceKeyBind};
