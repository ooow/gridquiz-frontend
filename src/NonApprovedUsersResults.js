import React, {Component} from 'react';
import {connect} from 'react-redux';

import ReactDataGrid from 'react-data-grid';
import {getNonApprovedUserResults} from './actions/getnonapprovedresults';
import {approve} from './actions/approve';

class NonApprovedUsersResults extends Component {

    constructor(props) {
        super(props);

        ['rowGetter', 'onRowSelect', 'onRowsDelete', 'handleGridSort', 'showGrid', 'approve'].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        let columnss = [
            {key: 'null', name: '', width: 70},
            {key: 'id', name: 'ID', sortable: true},
            {key: 'name', name: 'USER NAME', sortable: true},
            {key: 'points', name: 'POINTS', sortable: true}
        ];

        this.state = {
            columns: columnss,
            sr: [],
            admin: JSON.parse(localStorage.getItem('user'))
        };

        if (this.state.admin) {
            this.props.getResults(this.state.admin.token);
        }
    }

    rowGetter(index) {
        return this.nonapproved[index];
    }

    onRowSelect(rows) {
        console.log(rows);
        this.setState({sr: rows});
    }

    onRowsDelete() {
        this.setState({sr: this.state.sr.map(i => i.isSelected = false)});
        this.setState({sr: []});
    }

    handleGridSort(sortColumn, sortDirection) {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };

        this.nonapproved = sortDirection !== 'NONE' ? this.nonapproved.sort(comparer) : this.originUsers.slice(0);
    }

    approve() {
        this.props.approveResults(this.state.admin.token, this.state.sr.map(i => i.id));
        this.onRowsDelete();
    }

    showGrid() {
        let rowText = this.state.sr.length === 1 ? 'result' : 'results';
        return (
            <div className='users-grid'>
                <div>{this.state.sr.length} {rowText} selected</div>

                <button onClick={this.approve}>approve {rowText}</button>

                <ReactDataGrid
                    ref={node => this.grid = node}
                    rowKey='id'
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.nonapproved.length}
                    enableRowSelect='multi'
                    minHeight={400}
                    onRowSelect={this.onRowSelect}
                    onGridSort={this.handleGridSort}
                />
            </div>
        );
    }


    render() {
        this.originUsers = this.props.nonapproved;
        this.nonapproved = this.props.nonapproved;
        return (
            <div>
                {this.state.admin && this.nonapproved && this.nonapproved.length !== 0 && this.showGrid()}
            </div>
        );
    }
}

export default connect(
    state => ({
        nonapproved: state.nonapproved
    }),
    dispatch => ({
        getResults: (adminToken) => {
            dispatch(getNonApprovedUserResults(adminToken));
        },
        approveResults: (adminToken, results) => {
            dispatch(approve(adminToken, results));
        }
    })
)(NonApprovedUsersResults);