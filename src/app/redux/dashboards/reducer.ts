import {DashboardActionTypes, DashboardState, FAILED_FETCHING_DASHBOARD, RECEIVE_DASHBOARD, REQUEST_DASHBOARD} from './types';

const initState: DashboardState = {
    isFetching: false,
};

export function dashboardReducer(state = initState, action: DashboardActionTypes): DashboardState {
    switch (action.type) {
        case RECEIVE_DASHBOARD:
            return {
                ...state,
                isFetching: false,
                dashboards: action.dashboards,
                error: undefined,
            };
        case REQUEST_DASHBOARD:
            return {...state, isFetching: true};
        case FAILED_FETCHING_DASHBOARD:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
}
