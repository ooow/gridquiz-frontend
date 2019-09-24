import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MiniQuiz from '../../../model/MiniQuiz';
import {Role, User} from '../../../model/User';
import MiniQuizView from '../index';
import {AppState} from '../../../redux/reducers';
import {toggleAuthDialog} from '../../../redux/user/action';
import './style.scss';

interface MiniQuizWrapperProps {
    miniQuiz: MiniQuiz;
    user?: User;
    key: string;
    toggleAuthDialog: any;
}

class MiniQuizWrapper extends Component<MiniQuizWrapperProps> {
    render() {
        const {miniQuiz, toggleAuthDialog, user, key} = this.props;

        if (user) {
            if (user.role === Role.ADMIN) {
                return (
                    <MiniQuizView miniQuiz={miniQuiz} key={key}>
                        <Link
                            to={`/dashboard`}
                            className='results-link'
                            style={{color: miniQuiz.color}}
                        >
                            RESULTS
                        </Link>
                    </MiniQuizView>
                );
            }
            return miniQuiz.attempt ?
                <MiniQuizView miniQuiz={miniQuiz} key={key}>
                    {
                        miniQuiz.attempt &&
                        <Link
                          to={`/dashboard/${miniQuiz.id}`}
                          className='results-link'
                          style={{color: miniQuiz.color}}
                        >
                            RESULTS
                        </Link>
                    }
                </MiniQuizView>
                :
                <Link to={`/quiz/${miniQuiz.id}`} key={key}>
                    <MiniQuizView miniQuiz={miniQuiz} />
                </Link>;
        }

        return (
            <div onClick={toggleAuthDialog} key={key}>
                <MiniQuizView miniQuiz={miniQuiz} />
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {};
}

export default connect(mapStateToProps, {toggleAuthDialog})(MiniQuizWrapper);
