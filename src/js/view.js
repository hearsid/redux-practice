import {isEnabled} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems)
    );
}

function renderApp(input, todoList) {
    if (isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList);
    }
    // only one feature test can be enabled at a time since it is coming as location hash so include it as elseIf
    else if (isEnabled('filter')) {
        return renderAddTodoAtBottom(input, todoList)+renderFilterBar();
    }
    else {
        return renderAddTodoAtTop(input, todoList);
    }
}

/**
 * @description It will be a concatenation of the todoApp and filter bar
 */
function renderFilterBar() {
    return `<div id="filterBar">
          <input type="radio" name="filter" value="Show all" checked> Show all <br>
          <input type="radio" name="filter" value="Show open" > Show open <br>
          <input type="radio" name="filter" value="Show closed" > Show closed <br>
    </div>`;
}
function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}
