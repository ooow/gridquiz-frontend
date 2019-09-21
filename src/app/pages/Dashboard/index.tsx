import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {UserToken} from '../../model/User';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Navbar from '../../components/Navbar';
import AuthButton from '../../components/Navbar/AuthButton';
import {Link} from 'react-router-dom';
import {getDashboards} from '../../redux/dashboards/thunk';
import {DashboardResult} from '../../model/DashboardResult';
import './style.scss';
import Result from '../../model/Result';

interface DashboardProps {
    userToken: UserToken;
    dashboards?: DashboardResult[];
    getDashboards: any;
}

interface DashboardState {
}

class Dashboard extends Component<DashboardProps, DashboardState> {
    componentDidMount() {
        const {userToken} = this.props;
        this.props.getDashboards(userToken.user.id);
    }

    renderTableRow(result: Result, place: number) {
        const time = '00:04:21';

        return (
            <div className='border-bottom d-flex justify-content-between' key={place}>
                <div>{place + 1}</div>
                <div>{result.userId}</div>
                <div>{result.points}</div>
                <div>{time}</div>
            </div>
        );
    }

    renderTable(results: Result[]) {
        return (
            <div className='col'>
                {results.map((r: Result, i: number) =>
                    this.renderTableRow(r, i))}
            </div>
        );
    }

    renderDashboardBody(dashboard: DashboardResult) {
        return (
            <div className='container dashboard-tab'>
                <div className='row justify-content-start'>
                    <p className='results-label'>
                        Results / {dashboard.miniQuiz.name}
                    </p>
                </div>
                {this.renderTable(dashboard.top5results)}
            </div>
        );
    }

    render() {
        const {dashboards} = this.props;
        console.log(1, dashboards);
        return (
            <div className='h-100vh'>
                <Navbar>
                    <Link to='/' className='text-white cursor-pointer mr-4'>
                        Home
                    </Link>
                    <AuthButton className='cursor-pointer' />
                </Navbar>
                <div className='container mt-3'>
                    {
                        dashboards &&
                        <Tabs id="dashboard-result-tabs">
                            {dashboards.map((d: DashboardResult) =>
                                <Tab
                                    eventKey={d.miniQuiz.id}
                                    title={d.miniQuiz.name}
                                    key={d.miniQuiz.id}
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
        userToken: state.userState.userToken!,
        dashboards: state.dashboardState.dashboards,
    };
}

export default connect(mapStateToProps, {getDashboards})(Dashboard);
