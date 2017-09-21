export default function quizzes(state = [], action) {
    if (action.type === 'LOAD_QUIZZES') {
        return action.payload;
    }

    if (action.type === 'LOAD_USER_HISTORY') {
        return action.payload;
    }

    return state;
}