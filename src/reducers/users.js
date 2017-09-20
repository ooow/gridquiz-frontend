export default function stopwatch(state = [], action) {
    if (action.type === 'LOAD_USERS') {
        return action.payload;
    }

    if (action.type === 'REMOVE_USERS') {
        return action.payload;
    }
    return state;
}