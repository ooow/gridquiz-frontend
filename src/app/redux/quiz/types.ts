import Quiz from '../../model/Quiz';

export const FAILED_SAVING_QUIZ = 'FAILED_SAVING_QUIZ';
export const SAVE_QUIZ = 'SAVE_QUIZ';
export const RECEIVE_QUIZ = 'RECEIVE_QUIZ';

export interface QuizState {
    error?: string;
    isFetching: boolean;
    quiz?: Quiz;
}

export type QuizActionTypes = FailedSavingQuiz | SaveQuiz | ReceiveQuiz;

export interface SaveQuiz {
    type: typeof SAVE_QUIZ;
}

export interface ReceiveQuiz {
    type: typeof RECEIVE_QUIZ;
    quiz: Quiz;
}

export interface FailedSavingQuiz {
    type: typeof FAILED_SAVING_QUIZ;
    error: string;
}
