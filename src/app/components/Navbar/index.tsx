import React, {Component} from 'react';
import {Role, UserToken} from '../../model/User';
import {connect} from 'react-redux';
import ArrowSvg from '../../assets/img/arrow.svg';
import {AppState} from '../../redux/reducers';
import AdminButton from '../AdminButton';
import Logo from '../Logo';
import LogoutButton from '../LogoutButton';
import LoginButton from '../LoginButton';
import './style.scss';

interface NavbarProps {
    userToken?: UserToken,
}

interface NavbarState {
    collapsed: boolean,
}

class Navbar extends Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props);

        this.state = {collapsed: false};
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        this.setState({collapsed: window.scrollY !== 0});
    }

    showAdminButton() {
        const {userToken} = this.props;

        return userToken && userToken.user.role === Role.ADMIN &&
          <AdminButton />;
    }

    showLogButton() {
        const {userToken} = this.props;

        return userToken ? <LogoutButton /> : <LoginButton />;
    }

    showUserInfo() {
        const {userToken} = this.props;

        return userToken && (
            <div className='user-info text-white mr-4'>
                {userToken.user.name}
            </div>
        );
    }

    showCollapsedMode() {
        return (
            <div className='container pt-3 collapsed'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-start'>
                        <Logo className='logo' />
                        <div className='d-flex flex-column ml-2'>
                            <h1 className='title'>Quiz</h1>
                            <p className='subtitle'>
                                by Grid Dynamics
                            </p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        {this.showUserInfo()}
                        {this.showAdminButton()}
                        {this.showLogButton()}
                    </div>
                </div>
            </div>
        );
    }

    showFullMode() {
        return (
            <div className='container-fluid p-5 h-100 full'>
                <div className='row justify-content-center mt-5'>
                    <Logo className='logo' />
                </div>
                <div className='row justify-content-center mt-5'>
                    <h1 className='welcome-text'>
                        Welcome to Grid Dynamics
                    </h1>
                </div>
                <div className='row justify-content-center'>
                    <h1 className='title'>
                        Quiz
                    </h1>
                </div>
                <div className='row justify-content-center mt-5 arrow'>
                    <img alt='arrow' src={ArrowSvg} />
                </div>
            </div>
        );
    }

    render() {
        const {collapsed} = this.state;

        let className = 'header';
        if (collapsed) {
            className += ' coll';
        }
        return (
            <div id='navbar'>
                <div className={className}>
                    <div>
                        {collapsed && this.showCollapsedMode()}
                    </div>
                    {this.showFullMode()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        userToken: state.userState.userToken,
    };
}

export default connect(mapStateToProps)(Navbar);
