import {createStore} from './lib/state';

const initialState = {
    todos: [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false
        }
    ]
};

/**
 * @description This is the reducer, it can return the new state
 * @param state
 * @param change
 */
function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            break;
        // Don't need to create another change handler since the change will be in the todos I can add the cases here

        case 'SHOW_ALL_TODO':
            // do nothing
            return state;
            break;

        case 'SHOW_OPEN_TODO':
            var newState = {};
            for( let todo of state.todos) {
                if(todo.done) {
                    newState.todos.push(todo)
                }
            }
            return newState;
        break;

        case 'SHOW_CLOSED_TODO':
            var newState = {};
            for( let todo of state.todos) {
                if(!todo.done) {
                    newState.todos.push(todo)
                }
            }
            return newState;
        break;



    }
}



export const todos = createStore(todoChangeHandler, initialState);

export const filters = createStore()
