export default function stopwatch(state = [], action) {
    if (action.type === 'LOAD_NON_APPROVED_USER_RESULTS') {
        return action.payload;
    }

    if (action.type === 'APPROVE_RESULTS') {
        return action.payload;
    }
    return state;
}