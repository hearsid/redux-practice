// These actions don't need to pass data to the dispatcher
export function showAllTodo(id) {
    return {
        type: 'SHOW_ALL_TODO',
        id
    }
} 

export function showOpenTodo(id) {
    return {
        type: 'SHOW_OPEN_TODO',
        id
    }
}

export function showClosedTodo(id) {
    return {
        type: 'SHOW_CLOSED_TODO',
        id
    }
} 