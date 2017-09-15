export default function quizzes(state = [], action) {
    if (action.type === 'LOAD_QUIZZES') {
        return action.payload;
    }

    return state;
}