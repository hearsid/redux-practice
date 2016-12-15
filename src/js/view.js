import {isEnabled} from './lib/feature';
import * as IncrementalDOM from "incremental-dom";

var elementOpen = IncrementalDOM.elementOpen,
    elementClose = IncrementalDOM.elementClose,
    elementVoid = IncrementalDOM.elementVoid,
    text = IncrementalDOM.text,
    patch = IncrementalDOM.patch;


export function render(el, state) {
    // this method is subscribed for changes so store the state in sessionStorage here
    sessionStorage.defaultState = JSON.stringify(state);
    // const todoItems = state.todos.map(renderTodoItem).join('');


    function renderIncrementalDOM() {
        elementOpen('div', '', null);
        text('hello world');
        elementClose('div');
    }

    patch(document.body, function () {
        renderApp(
            // renderInput(),
            // renderTodos(state),
            state,
            state.activeFilter
        );
    });
}

function renderApp(state, activeFilter) {
    if (isEnabled('renderBottom')) {
         renderAddTodoAtBottom(state);
    }
    // only one feature test can be enabled at a time since it is coming as location hash so include it as elseIf
    else if (isEnabled('filter')) {
         renderAddTodoAtBottom(state);
         renderFilterBar(activeFilter);
    }
    else {
         renderAddTodoAtTop(input, todoList);
    }
}

/**
 * @description It will be a concatenation of the todoApp and filter bar
 */
function renderFilterBar(activeFilter) {
    var filterOptions = [
        {title: 'Show all', id: 'showAll'},
        {title: 'Show open', id: 'showOpen'},
        {title: 'Show closed', id: 'showClosed'}
    ];
    // var filterOptionsView = filterOptions.map( single => {
    //     return renderFilterRadioButton (single, activeFilter);
    //         }).join('');
    elementOpen('div', '', null, 'id', 'filterBar');
    filterOptions.map(single => {
        renderFilterRadioButton(single, activeFilter);
    });
    elementClose('div');
    // return `<div id="filterBar">
    //         ${filterOptionsView}
    // </div>`;
}

function renderFilterRadioButton(option, activeFilter = {id: 'showAll'}) {
    var s1 = ['type', 'radio', 'name', 'filter', 'class', 'filter_selection', 'value', option.title,
        'data-id', option.id, 'checked', (option.id == activeFilter.id) ? 'true' : 'false'];
    elementOpen('input', '', s1);
    elementClose('input');
    text(option.title);
    elementVoid('br', '');


}
function renderAddTodoAtTop(state) {
    // var app = `
    //     ${input}
    //     ${todoList}
    // `;

    elementOpen('div', '', null, 'id', 'app');
    renderInput();
    renderTodos(state);
    elementClose('div');
}

function renderAddTodoAtBottom(state) {
    // var app = `
    //     ${todoList}
    //     ${input}
    // `;

    elementOpen('div', '', null, 'id', 'app');
    renderTodos(state);
    renderInput();
    elementClose('div');
}

function renderInput() {
    elementOpen('div', '', null, 'class', 'todo__input');
    elementVoid('input', '', ['type', 'text', 'id', 'todoInput']);
    elementOpen('button', '', ['id', 'addTodo']);
    text('Add');
    elementClose('button')
    elementClose('div');
}

function renderTodos(state) {
    elementOpen('ul', '', null, 'class', 'todo');
    state.todos.map(item => {
        renderTodoItem(item)
    });

    elementClose('ul');
    // return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    elementOpen('li', '', null, 'class', todoClass);
    elementVoid('input', '', ['type', 'checkbox', 'class', 'js_toggle_todo',
        'data-id', todo.id,  ((todo.done == true) ? 'checked' : 'data-blank'), ((todo.done == true) ? 'true' : 'blank')]);
    text(todo.text);
    elementClose('li');
    // return `<li class="${todoClass}">
    //     <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
    //     ${todo.text}
    // </li>`;
}
