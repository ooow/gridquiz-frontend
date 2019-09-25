import React, {Component} from 'react';
import {AppState} from '../../../redux/reducers';
import {connect} from 'react-redux';
import Spinner from '../../../components/Spinner';
import {User} from '../../../model/User';
import {getUsers} from '../../../redux/admin/thunk';
import Table from 'react-bootstrap/Table';

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

    renderUserRow(user: User, index: number) {
        return (
            <tr key={user.id}>
                <td>{index}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
            </tr>
        );
    }

    renderUsersTable(users: User[]) {
        return (
            <div className='mt-2'>
                <Table bordered hover responsive>
                    <thead>
                    <tr>
                        <th className='text-inline'>#</th>
                        <th className='text-inline'>ID</th>
                        <th className='text-inline'>EMAIL</th>
                        <th className='text-inline'>NAME</th>
                        <th className='text-inline'>PHONE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u, i) => this.renderUserRow(u, i + 1))}
                    </tbody>
                </Table>
            </div>
        );
    }

    render() {
        const {isFetching, users} = this.props;

        return !isFetching && users ?
            <div id='users-control' className='container'>
                {this.renderUsersTable(users!)}
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
