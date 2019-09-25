import {FAILED_SAVING_QUIZ, FailedSavingQuiz, RECEIVE_QUIZ, ReceiveQuiz, SAVE_QUIZ, SaveQuiz} from './types';
import Quiz from '../../model/Quiz';

export function saveQuiz(): SaveQuiz {
    return {type: SAVE_QUIZ};
}

export function receiveQuiz(quiz: Quiz): ReceiveQuiz {
    return {type: RECEIVE_QUIZ, quiz};
}

export function failedSavingQuiz(error: string): FailedSavingQuiz {
    return {type: FAILED_SAVING_QUIZ, error};
}
