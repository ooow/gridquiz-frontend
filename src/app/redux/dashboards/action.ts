import {FAILED_FETCHING_DASHBOARD, FailedFetchingDashboards, RECEIVE_DASHBOARD, ReceiveDashboard, REQUEST_DASHBOARD, RequestDashboard} from './types';
import {DashboardResult} from '../../model/DashboardResult';

export function requestDashboards(): RequestDashboard {
    return {type: REQUEST_DASHBOARD};
}

export function receiveDashboards(dashboards: DashboardResult[]): ReceiveDashboard {
    return {type: RECEIVE_DASHBOARD, dashboards};
}

export function failedFetchingDashboards(error: string): FailedFetchingDashboards {
    return {type: FAILED_FETCHING_DASHBOARD, error};
}
