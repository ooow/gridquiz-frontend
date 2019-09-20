import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../redux/reducers';
import {UserToken} from '../../../model/User';
import {SafeEmptyRender} from '../index';

interface UserInfoProps {
    className: string,
    userToken?: UserToken,
}

class UserInfo extends Component<UserInfoProps> {
    static defaultProps: UserInfoProps = {
        className: 'text-inline text-white mr-4',
    };

    render() {
        const {userToken, className} = this.props;

        return userToken ? (
            <div className={className}>
                {userToken.user.name}
            </div>
        ) : SafeEmptyRender;
    }
}

function mapStateToProps(state: AppState) {
    return {userToken: state.userState.userToken};
}

export default connect(mapStateToProps)(UserInfo);
