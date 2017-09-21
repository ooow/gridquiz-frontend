export default function useranswers(state = [], action) {
    if (action.type === 'SUBMIT_ANSWER') {

        let hasExist = state.findIndex(i =>
            i.quizId === action.payload.quizId &&
            i.questionId === action.payload.questionId
        );

        if (hasExist !== -1)
            state.splice(hasExist, 1);

        return [
            ...state,
            action.payload
        ];
    }

    if (action.type === 'CLEAN_ANSWERS_STORY') {
        return action.payload;
    }

    return state;
}