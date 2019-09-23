import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {User} from '../../model/User';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Navbar from '../../components/Navbar';
import AuthButton from '../../components/Navbar/AuthButton';
import {getDashboards, getOpenDashboards} from '../../redux/dashboards/thunk';
import {Dashboard} from '../../model/Dashboard';
import Result from '../../model/Result';
import {format} from '../../components/Navbar/Stopwatch';
import LoginDialog from '../../components/LoginDialog';
import './style.scss';

interface DashboardProps {
    user: User;
    dashboards?: Dashboard[];
    match: any;
    getDashboards: any;
    getOpenDashboards: any;
}

interface DashboardState {
}

class DashboardView extends Component<DashboardProps, DashboardState> {
    componentDidMount() {
        this.updateDashboards();
    }

    componentDidUpdate(prevProps: DashboardProps) {
        if (this.props.user !== prevProps.user) {
            this.updateDashboards();
        }
    }

    updateDashboards() {
        const {user} = this.props;
        user ?
            this.props.getDashboards(user.id) :
            this.props.getOpenDashboards();
    }

    renderTableRow(result: Result) {
        let className = 'border-bottom d-flex justify-content-between px-3 result-text';
        if (result.highlighted) {
            className += ' highlighted';
        }

        return (
            <div className={className} key={result.place}>
                <p>{result.place} {result.highlighted && 'You!'}</p>
                <p>{result.userId}</p>
                <p>{result.points}</p>
                <p>{format(result.seconds)}</p>
            </div>
        );
    }

    renderTable(results: Result[]) {

        return (
            <div className='col px-5 mt-2'>
                {results.map((r: Result) =>
                    this.renderTableRow(r))}
            </div>
        );
    }

    renderDashboardBody(dashboard: Dashboard) {
        return (
            <div className='container dashboard-tab'>
                <div className='row justify-content-start mt-5 ml-5'>
                    <p className='results-label'>
                        Results / {dashboard.miniQuiz.name}
                    </p>
                </div>
                {this.renderTable(dashboard.results)}
            </div>
        );
    }

    render() {
        const {dashboards, user, match} = this.props;
        const currentTabId = match.params.id;

        return (
            <div className='h-100vh'>
                {!user && <LoginDialog />}
                <Navbar activeLinkToHome={true}>
                    <AuthButton />
                </Navbar>
                <div className='dashboard-stub'></div>
                <div className='container mt-3'>
                    {
                        dashboards &&
                        <Tabs
                          id="dashboard-result-tabs"
                          activeKey={currentTabId}
                        >
                            {dashboards.map((d: Dashboard) =>
                                <Tab
                                    eventKey={d.miniQuiz.id}
                                    title={d.miniQuiz.name}
                                    key={d.miniQuiz.id}
                                    tabClassName='tab text-inline'
                                >
                                    {this.renderDashboardBody(d)}
                                </Tab>,
                            )}

                        </Tabs>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        user: state.userState.user!,
        dashboards: state.dashboardState.dashboards,
    };
}

export default connect(mapStateToProps,
    {getDashboards, getOpenDashboards})(
    DashboardView);
