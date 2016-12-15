import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, filterTodos} from './actions';
import {showAllTodo, showOpenTodo, showClosedTodo} from './filterActions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });
    
    listen('click', '.filter_selection', event => {
        const id = event.target.getAttribute('data-id'); 

        if(id == 'showAll') {
            todos.dispatch(showAllTodo(id));
        }
        else if(id == 'showOpen') {
            todos.dispatch(showOpenTodo(id));
        }
        else if(id == 'showClosed') {
            todos.dispatch(showClosedTodo(id));
        }
        
    });
}
