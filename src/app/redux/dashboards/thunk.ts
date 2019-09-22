import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {get, LOAD_DASHBOARDS_URL, LOAD_OPEN_DASHBOARDS_URL, post} from '../api';
import {failedFetchingDashboards, receiveDashboards, requestDashboards} from './action';
import {Dashboard} from '../../model/Dashboard';

/** Submits user answers. */
export function getDashboards(userId: string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestDashboards());
        try {
            const dashboards: Dashboard[] = await post<Dashboard[]>(
                LOAD_DASHBOARDS_URL,
                userId);
            dispatch(receiveDashboards(dashboards));
        } catch (e) {
            dispatch(failedFetchingDashboards('Could not fetch dashboards'));
        }
    };
}

/** Submits user answers. */
export function getOpenDashboards(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestDashboards());
        try {
            const dashboards: Dashboard[] = await get<Dashboard[]>(
                LOAD_OPEN_DASHBOARDS_URL);
            dispatch(receiveDashboards(dashboards));
        } catch (e) {
            dispatch(failedFetchingDashboards('Could not fetch dashboards'));
        }
    };
}
