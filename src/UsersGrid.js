import React, {Component} from 'react';
import {connect} from 'react-redux';

import ReactDataGrid from 'react-data-grid';
import {getUsers} from "./actions/getusers";
import {removeUsers} from "./actions/removeusers";

class UsersGrid extends Component {

    constructor(props) {
        super(props);

        ["rowGetter", "onRowSelect", "onRowsDelete", "handleGridSort", "showGrid", "deleteUsers"].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        let columnss = [
            {key: 'null', name: '', width: 70},
            {key: 'id', name: 'ID', sortable: true},
            {key: 'name', name: 'NAME', sortable: true},
            {key: 'email', name: 'EMAIL', sortable: true},
            {key: 'phone', name: 'PHONE', sortable: true}
        ];

        this.state = {
            columns: columnss,
            selectedRows: [],
            admin: JSON.parse(localStorage.getItem('user'))
        };

        if (this.state.admin) {
            this.props.getUsers(this.state.admin.token);
        }
    }

    rowGetter(index) {
        return this.users[index];
    }

    onRowSelect(rows) {
        this.setState({selectedRows: rows});
    }

    onRowsDelete() {
        this.setState({selectedRows: this.state.selectedRows.map(i => i.isSelected = false)});
        this.setState({selectedRows: []});
    }

    handleGridSort(sortColumn, sortDirection) {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };

        this.users = sortDirection !== 'NONE' ? this.users.sort(comparer) : this.originUsers.slice(0);
    }

    deleteUsers() {
        this.props.removeUsers(this.state.admin.token, this.state.selectedRows.map(i => i.id));
        this.onRowsDelete();
    }

    showGrid() {
        let rowText = this.state.selectedRows.length === 1 ? 'user' : 'users';
        return (
            <div className="users-grid">
                <div>{this.state.selectedRows.length} {rowText} selected</div>

                <button onClick={this.deleteUsers}>remove {rowText}</button>

                <ReactDataGrid
                    ref={node => this.grid = node}
                    rowKey="id"
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.users.length}
                    enableRowSelect="multi"
                    minHeight={500}
                    onRowSelect={this.onRowSelect}
                    onGridSort={this.handleGridSort}
                />
            </div>
        );
    }


    render() {
        this.originUsers = this.props.users;
        this.users = this.props.users;
        return (
            <div>
                {this.state.admin && this.users && this.users.length !== 0 && this.showGrid()}
            </div>
        );
    }
}

export default connect(
    state => ({
        users: state.users
    }),
    dispatch => ({
        getUsers: (adminToken) => {
            dispatch(getUsers(adminToken));
        },
        removeUsers: (adminToken, usersIds) => {
            dispatch(removeUsers(adminToken, usersIds));
        }
    })
)(UsersGrid);