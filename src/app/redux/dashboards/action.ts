import {FAILED_FETCHING_DASHBOARD, FailedFetchingDashboards, RECEIVE_DASHBOARD, ReceiveDashboard, REQUEST_DASHBOARD, RequestDashboard} from './types';
import {Dashboard} from '../../model/Dashboard';

export function requestDashboards(): RequestDashboard {
    return {type: REQUEST_DASHBOARD};
}

export function receiveDashboards(dashboards: Dashboard[]): ReceiveDashboard {
    return {type: RECEIVE_DASHBOARD, dashboards};
}

export function failedFetchingDashboards(error: string): FailedFetchingDashboards {
    return {type: FAILED_FETCHING_DASHBOARD, error};
}
