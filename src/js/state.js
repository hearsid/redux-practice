import {createStore} from './lib/state';
import Manager from './Manager';

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

Manager.defaultState = initialState; // it is global

/**
 * @description This is the reducer, it can return the new state
 * @param state
 * @param change
 */
function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            // state is immutable, changing the old flow to return a new state
            var newState = Object.assign({}, state);
            newState.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });
            Manager.defaultState = state;
            return newState; // ideally shouldn't make change to a param but here since we are not returning state doing so
            break;

        case 'TODO_TOGGLE_DONE':
            var newState = Object.assign({}, state);
            for(let todo of newState.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            Manager.defaultState = state;
            return newState;
            break;
        // Don't need to create another change handler since the change will be in the todos I can add the cases here

        case 'SHOW_ALL_TODO':
            // do nothing
            var newState =  {...Manager.defaultState, activeFilter: change };
            return newState;
            break;

        case 'SHOW_OPEN_TODO':
            var newState = { todos: [], activeFilter: change };
            for( let todo of Manager.defaultState.todos) {
                if(!todo.done) { // if todo is not done then it is open
                    newState.todos.push(todo)
                }
            }
            return newState;
        break;

        case 'SHOW_CLOSED_TODO':
            var newState = { todos: [], activeFilter: change };
            for( let todo of Manager.defaultState.todos) {
                if(todo.done) {
                    newState.todos.push(todo)
                }
            }
            return newState;
        break;



    }
}


var theState = JSON.parse(sessionStorage.defaultState) || initialState;
export const todos = createStore(todoChangeHandler, theState);
