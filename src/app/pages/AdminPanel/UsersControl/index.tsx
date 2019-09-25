import React, {Component} from 'react';
import {AppState} from '../../../redux/reducers';
import {connect} from 'react-redux';
import Spinner from '../../../components/Spinner';
import {User} from '../../../model/User';
import {getUsers} from '../../../redux/admin/thunk';
import Table from 'react-bootstrap/Table';
import {ADMIN_DOWNLOAD_REPORT_URL, getHeaders} from '../../../redux/api';

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

    async handelDownload() {
        try {
            const response = await fetch(ADMIN_DOWNLOAD_REPORT_URL, {
                method: 'get',
                headers: getHeaders(),
            });

            const reader = response.body!.getReader();

            // Read the data
            let receivedLength = 0; // received that many bytes at the moment
            let chunks = []; // array of received binary chunks (comprises the
                             // body)
            while (true) {
                const {done, value} = await reader.read();
                if (done) {
                    break;
                }
                chunks.push(value);
                receivedLength += value.length;
            }

            // Concatenate chunks into single Uint8Array
            let chunksAll = new Uint8Array(receivedLength);
            let position = 0;
            for (let chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }

            const blob = new Blob([chunksAll]);
            const fileName = `Grid Quiz Report ${new Date().toLocaleDateString()}.xlsx`;
            const csvURL = window.URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', fileName);
            tempLink.click();
        } catch (e) {
            console.log(e);
            // Do nothing.
        }
    }

    renderUserRow(user: User, index: number) {
        return (
            <tr key={user.id}>
                <td>{index}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                    <button type='button' className='btn btn-outline-danger'>
                        Delete
                    </button>
                </td>
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
                        <th className='text-inline'>ACTION</th>
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
                <div className='row justify-content-between'>
                    <h3>Users</h3>
                    <button
                        type='button'
                        className='btn btn-warning'
                        style={{height: 40}}
                        onClick={this.handelDownload.bind(this)}
                    >
                        Download Report
                    </button>
                </div>
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
