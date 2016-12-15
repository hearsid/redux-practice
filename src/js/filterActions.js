// These actions don't need to pass data to the dispatcher
export function showAllTodo() {
    return {
        type: 'SHOW_ALL_TODO'
    }
} 

export function showOpenTodo() {
    return {
        type: 'SHOW_OPEN_TODO'
    }
}

export function showClosedTodo() {
    return {
        type: 'SHOW_CLOSED_TODO'
    }
} 