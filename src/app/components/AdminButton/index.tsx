import React, {Component} from 'react';
import AdminSvg from './../../assets/img/admin.svg';
import {Link} from 'react-router-dom';
import {ADMIN_PAGE_URL} from '../../router';

class AdminButton extends Component {
    render() {
        return (
            <Link to={ADMIN_PAGE_URL} className='mr-4'>
                <img
                    alt='Login button'
                    className='cursor-pointer text-white'
                    src={AdminSvg}
                    style={{width: '28px', height: '28px'}}
                />
            </Link>
        );
    }
}

export default AdminButton;
