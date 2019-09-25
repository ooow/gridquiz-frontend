import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../redux/reducers';
import {ADMIN_DOWNLOAD_REPORT_URL, getHeaders} from '../../../redux/api';
import {getUsers} from '../../../redux/admin/thunk';
import {User} from '../../../model/User';
import Spinner from '../../../components/Spinner';
import UserTable from './UserTable';

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

    render() {
        const {isFetching, users} = this.props;

        return !isFetching && users ?
            <div id='users-control' className='container'>
                <div className='row justify-content-between p-3'>
                    <h3 className='text-white'>Users</h3>
                    <button
                        type='button'
                        className='btn btn-outline-warning'
                        style={{height: 40}}
                        onClick={this.handelDownload.bind(this)}
                    >
                        Download Report
                    </button>
                </div>
                <UserTable users={users} />
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
