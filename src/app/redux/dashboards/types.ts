import {DashboardResult} from '../../model/DashboardResult';

export const FAILED_FETCHING_DASHBOARD = 'FAILED_FETCHING_DASHBOARD';
export const RECEIVE_DASHBOARD = 'RECEIVE_DASHBOARD';
export const REQUEST_DASHBOARD = 'REQUEST_DASHBOARD';

export interface DashboardState {
    isFetching: boolean;
    dashboards?: DashboardResult[];
    error?: string;
}

export type DashboardActionTypes = RequestDashboard | ReceiveDashboard
    | FailedFetchingDashboards;

export interface RequestDashboard {
    type: typeof REQUEST_DASHBOARD;
}

export interface ReceiveDashboard {
    type: typeof RECEIVE_DASHBOARD;
    dashboards: DashboardResult[]
}

export interface FailedFetchingDashboards {
    type: typeof FAILED_FETCHING_DASHBOARD;
    error: string;
}
