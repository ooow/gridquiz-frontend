export default function quiz(state = [], action) {
    if (action.type === 'LOAD_QUIZ') {
        return action.payload;
    }

    if (action.type === 'CLEAN_QUIZ') {
        return action.payload;
    }

    return state;
}