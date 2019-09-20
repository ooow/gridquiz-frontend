import {FAILED_FETCHING_MINI_QUIZZES, FAILED_FETCHING_PROGRESS, NEXT_QUESTION, QuizActionTypes, QuizState, RECEIVE_MINI_QUIZZES, RECEIVE_PROGRESS, REQUEST_MINI_QUIZZES, START_PROGRESS, STORE_ANSWER} from './types';

const initState: QuizState = {
    isFetching: false,
    miniQuizzes: Array(0),
};

export function quizReducer(state = initState, action: QuizActionTypes): QuizState {
    switch (action.type) {
        case RECEIVE_MINI_QUIZZES:
            return {
                ...state,
                isFetching: false,
                miniQuizzes: action.miniQuizzes,
                error: undefined,
            };
        case RECEIVE_PROGRESS:
            return {
                ...state,
                isFetching: false,
                currentColor: action.progress.quiz.color,
                progress: {
                    quiz: action.progress.quiz,
                    start: action.progress.start,
                    // Set first question.
                    question: action.progress.quiz.questions[0],
                    answers: [],
                },
                error: undefined,
            };
        case STORE_ANSWER:
            return {
                ...state,
                progress: {
                    ...state.progress!,
                    answers: [...state.progress!.answers, action.answer],
                },
            };
        case NEXT_QUESTION:
            return {
                ...state,
                progress: {
                    ...state.progress!,
                    question: state.progress!.quiz.questions[action.index],
                },
            };
        case REQUEST_MINI_QUIZZES:
        case START_PROGRESS:
            return {...state, isFetching: true};
        case FAILED_FETCHING_MINI_QUIZZES:
        case FAILED_FETCHING_PROGRESS:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
}
