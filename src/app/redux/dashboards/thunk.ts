import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {LOAD_DASHBOARDS_URL, post} from '../api';
import {failedFetchingDashboards, receiveDashboards, requestDashboards} from './action';
import {DashboardResult} from '../../model/DashboardResult';

/** Submits user answers. */
export function getDashboards(userId: string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestDashboards());
        try {
            const dashboards: DashboardResult[] = await post<DashboardResult[]>(
                LOAD_DASHBOARDS_URL,
                userId);
            dispatch(receiveDashboards(dashboards));
        } catch (e) {
            dispatch(failedFetchingDashboards('Could not fetch dashboards'));
        }
    };
}
