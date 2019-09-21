import Progress from '../../model/Progress';

export const FAILED_FETCHING_PROGRESS = 'FAILED_FETCHING_PROGRESS';
export const START_PROGRESS = 'START_PROGRESS';
export const RECEIVE_PROGRESS = 'RECEIVE_PROGRESS';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const CLEAN_PROGRESS = 'CLEAN_PROGRESS';

export interface ProgressState {
    currentColor?: string;
    error?: string;
    isFetching: boolean;
    progress?: Progress;
    isFinished: boolean;
}

export type ProgressActionTypes = ReceiveProgress
    | FailedFetchingProgress | StartProgress | UpdateProgress | CleanProgress;

export interface StartProgress {
    type: typeof START_PROGRESS;
}

export interface ReceiveProgress {
    type: typeof RECEIVE_PROGRESS;
    progress: Progress;
}

export interface FailedFetchingProgress {
    type: typeof FAILED_FETCHING_PROGRESS;
    error: string;
}

export interface UpdateProgress {
    type: typeof UPDATE_PROGRESS;
    progress: Progress;
}

export interface CleanProgress {
    type: typeof CLEAN_PROGRESS;
}
