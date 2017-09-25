export default function quiz(state = [], action) {
    if (action.type === 'LOAD_DASHBOARD') {
        return action.payload;
    }

    if (action.type === 'UPDATE_DASHBOARD') {
        return action.payload;
    }

    return state;
}