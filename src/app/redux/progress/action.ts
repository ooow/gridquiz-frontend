import {CLEAN_PROGRESS, CleanProgress, FAILED_FETCHING_PROGRESS, FailedFetchingProgress, RECEIVE_PROGRESS, ReceiveProgress, START_PROGRESS, StartProgress, UPDATE_PROGRESS, UpdateProgress} from './types';
import Progress from '../../model/Progress';

export function startProgress(): StartProgress {
    return {type: START_PROGRESS};
}

export function receiveProgress(progress: Progress): ReceiveProgress {
    return {type: RECEIVE_PROGRESS, progress};
}

export function updateProgress(progress: Progress): UpdateProgress {
    return {type: UPDATE_PROGRESS, progress};
}

export function cleanProgress(): CleanProgress {
    return {type: CLEAN_PROGRESS};
}

export function failedFetchingProgress(error: string): FailedFetchingProgress {
    return {type: FAILED_FETCHING_PROGRESS, error};
}
