import React, {Component} from 'react';
import {AppState} from '../../../redux/reducers';
import {connect} from 'react-redux';
import Spinner from '../../../components/Spinner';

interface QuizzesProps {
    isFetching?: boolean;
}

interface QuizzesState {
}

//TODO: Finish component.
class Quizzes extends Component<QuizzesProps, QuizzesState> {
    componentDidMount() {
        //this.props.getUsers();
    }

    render() {
        const {isFetching} = this.props;

        //return !isFetching ?

        return true ?
            <div id='users-control' className='container'>
                <div className='row justify-content-between p-3'>
                    <h3 className='text-white'>Quizzes</h3>
                </div>
            </div>
            : <Spinner />;
    }
}

function mapStateToProps(state: AppState) {
    return {
        // users: state.adminState.users,
        // isFetching: state.adminState.isFetching,
    };
}

export default connect(mapStateToProps)(Quizzes);
