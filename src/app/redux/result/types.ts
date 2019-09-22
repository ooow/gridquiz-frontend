import Result from '../../model/Result';

export const FAILED_SUBMITTING_ANSWERS = 'FAILED_SUBMITTING_ANSWERS';
export const RECEIVE_RESULT = 'RECEIVE_RESULT';
export const SUBMIT_ANSWERS = 'SUBMIT_ANSWERS';
export const CLEAN_RESULT = 'CLEAN_RESULT';

export interface ResultState {
    isFetching: boolean,
    result?: Result,
    error?: string,
}

export type ResultActionTypes = SubmitAnswers
    | ReceiveResult | FailedSubmittingAnswers | CleanResult;

export interface SubmitAnswers {
    type: typeof SUBMIT_ANSWERS;
}

export interface ReceiveResult {
    type: typeof RECEIVE_RESULT;
    result: Result
}

export interface CleanResult {
    type: typeof CLEAN_RESULT;
}

export interface FailedSubmittingAnswers {
    type: typeof FAILED_SUBMITTING_ANSWERS;
    error: string;
}

