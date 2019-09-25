import React, {Component} from 'react';
import {AppState} from '../../../redux/reducers';
import {connect} from 'react-redux';
import Spinner from '../../../components/Spinner';
import {User} from '../../../model/User';
import {getUsers} from '../../../redux/admin/thunk';

interface UsersControlProps {
    users?: User[];
    isFetching: boolean;
    getUsers: any;
}

interface UsersControlState {

}

class UsersControl extends Component<UsersControlProps, UsersControlState> {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const {isFetching, users} = this.props;
        console.log(1, users);

        return !isFetching ?
            <div id='users-control' className='container'>
                Hi
            </div>
            : <Spinner />;
    }
}

function mapStateToProps(state: AppState) {
    return {
        users: state.adminState.users,
        isFetching: state.adminState.isFetching,
    };
}

export default connect(mapStateToProps, {getUsers})(UsersControl);
