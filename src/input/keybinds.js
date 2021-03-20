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

class KeyBindContainer {
    /**
     * Clear ALL currently registered key actions
     */
    clearAllKeyBinds() {
        Object.keys(this).forEach(key => {
            delete this[key];
        });
    }

    /**
     * Clear the action associated with this key (if any)
     * @param {string} key 
     */
    clearKeyBind(key) {
        delete this[key.toLowerCase];
    }

    performKeyAction(key) {
        if (this[key] !== undefined) {
            this[key]();
        }
    }

    /**
     * Register this action to this key. Will be combined with any actions that are already there, with the new action being performed after the first
     * @param {string} key String of the key (will be matched to event.key)
     * @param {function} action 
     */
    addKeyBind(key, action) {
        let lowercaseKey = key.toLowerCase();
        if (this[lowercaseKey] === undefined) {
            this[lowercaseKey] = action;
        }
        else {
            this[lowercaseKey] = combineFunctions(this[lowercaseKey], action);
        }
    }

    /**
     * Register this action to this key, replacing any previous action
     * @param {string} key 
     * @param {function} action 
     */
    replaceKeyBind(key, action) {
        let lowercaseKey = key.toLowerCase();
        delete this[lowercaseKey];
        this[lowercaseKey] = action;
    }
}

export default KeyBindContainer;