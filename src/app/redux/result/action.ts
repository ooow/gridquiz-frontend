import {CLEAN_RESULT, CleanResult, FAILED_SUBMITTING_ANSWERS, FailedSubmittingAnswers, RECEIVE_RESULT, ReceiveResult, SUBMIT_ANSWERS, SubmitAnswers} from './types';
import Result from '../../model/Result';

export function submitAnswers(): SubmitAnswers {
    return {type: SUBMIT_ANSWERS};
}

export function receiveResult(result: Result): ReceiveResult {
    return {type: RECEIVE_RESULT, result};
}

export function cleanResult(): CleanResult {
    return {type: CLEAN_RESULT};
}

export function failedSubmittingAnswers(error: string): FailedSubmittingAnswers {
    return {type: FAILED_SUBMITTING_ANSWERS, error};
}
