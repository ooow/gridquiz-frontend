import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../redux/reducers';
import AdminSvg from '../../../assets/img/admin.svg';
import {Link} from 'react-router-dom';
import {ADMIN_PAGE_URL} from '../../../router';
import {Role, User} from '../../../model/User';
import {SafeEmptyRender} from '../index';

interface AdminButtonProps {
    className: string,
    user?: User,
}

class AdminButton extends Component<AdminButtonProps> {
    static defaultProps: AdminButtonProps = {
        className: 'cursor-pointer',
    };

    isAdmin() {
        const {user} = this.props;
        return user && user.role === Role.ADMIN;
    }

    render() {
        const {className} = this.props;

        return this.isAdmin() ? (
            <Link to={ADMIN_PAGE_URL} className={className}>
                <img
                    alt='Go to admin page button'
                    src={AdminSvg}
                    style={{width: '28px', height: '28px'}}
                />
            </Link>
        ) : SafeEmptyRender;
    }
}

function mapStateToProps(state: AppState) {
    return {user: state.userState.user};
}

export default connect(mapStateToProps)(AdminButton);
