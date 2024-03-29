import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../redux/reducers';
import {User} from '../../../model/User';
import {SafeEmptyRender} from '../index';
import './style.scss';

interface UserInfoProps {
    className: string,
    user?: User,
}

class UserInfo extends Component<UserInfoProps> {
    static defaultProps: UserInfoProps = {
        className: 'user-info text-white mr-4',
    };

    render() {
        const {user, className} = this.props;

        return user ? (
            <div className={className} style={{fontWeight: 600}}>
                {user.name}
            </div>
        ) : SafeEmptyRender;
    }
}

function mapStateToProps(state: AppState) {
    return {user: state.userState.user};
}

export default connect(mapStateToProps)(UserInfo);
