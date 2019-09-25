import React, {Component} from 'react';
import {User} from '../../../../model/User';

interface UserRowProps {
    user: User;
    index: number;
}

class UserRow extends Component<UserRowProps> {
    render() {
        const {user, index} = this.props;

        return (
            <tr key={user.id} className='text-white'>
                <td>{index}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-outline-danger'>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default UserRow;
