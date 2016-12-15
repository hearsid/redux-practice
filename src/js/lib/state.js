export function createStore(reducer, initial = {}) {
    const listeners = [];
    let state = initial;
    return {
        dispatch(change) {
            state = reducer(state, change) || state;
            // before passing new state save it to the storage
            sessionStorage.defaultState = JSON.stringify(state);
            for(let listener of listeners) {
                listener(state);
            }
        },

        getState() {
            return state;
        },

        subscribe(listener) {
            listeners.push(listener);
        }
    };
}
