import React, {Component} from 'react';
import {User} from '../../../../model/User';
import Table from 'react-bootstrap/Table';
import UserRow from '../UserRow';

interface UserRowProps {
    users: User[];
}

class UserTable extends Component<UserRowProps> {
    render() {
        const {users} = this.props;

        return (
            <div className='mt-2'>
                <Table bordered hover responsive size="sm">
                    <thead>
                    <tr className='text-info'>
                        <th className='text-inline'>#</th>
                        <th className='text-inline'>ID</th>
                        <th className='text-inline'>EMAIL</th>
                        <th className='text-inline'>NAME</th>
                        <th className='text-inline'>PHONE</th>
                        <th className='text-inline'>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u, i) => <UserRow user={u} index={i + 1} />)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UserTable;
