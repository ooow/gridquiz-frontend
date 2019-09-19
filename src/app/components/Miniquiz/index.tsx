import React, {Component, CSSProperties} from 'react';
import MiniQuiz from '../../model/MiniQuiz';
import {Link} from 'react-router-dom';
import {AppState} from '../../redux/reducers';
import {connect} from 'react-redux';
import {toggleLoginDialog} from '../../redux/user/action';
import {UserToken} from '../../model/User';
import './style.scss';

const defaultColor = '#197E92';

interface MainQuizProp {
    miniQuiz: MiniQuiz;
    userToken?: UserToken,
    toggleLoginDialog: any;
}

class MiniQuizView extends Component<MainQuizProp> {
    renderMiniQuiz() {
        const {miniQuiz} = this.props;
        const style: CSSProperties = {background: miniQuiz.color || defaultColor};

        return (
            <div
                id='mini-quiz'
                className='card shadow cursor-pointer border-0 m-3'
                style={style}
            >
                <p className='card-title d-flex align-items-start justify-content-center pt-5 flex-fill text-inline name'>
                    {miniQuiz.name}
                </p>
                <div className='d-flex bg-white px-3 align-items-center justify-content-between'>
                    <div className='d-flex flex-column info-container'>
                        <p className='card-subtitle mt-4 description text-inline'>
                            {miniQuiz.description}
                        </p>
                        <p className='info text-inline'>
                            {miniQuiz.questionsComplete} / {miniQuiz.questionsSize} QUESTIONS
                        </p>
                    </div>
                    {
                        miniQuiz.attempt &&
                        <Link
                          to='/lol'
                          className='results-link'
                          style={{color: miniQuiz.color}}
                        >
                            RESULTS
                        </Link>
                    }
                </div>
            </div>
        );
    }

    activeQuiz() {
        const {miniQuiz} = this.props;
        const link = miniQuiz.attempt ? '#' : `/quiz/${miniQuiz.id}`;
        const style: CSSProperties = miniQuiz.attempt ? {opacity: 0.6} : {};

        return (
            <Link to={link} style={style}>
                {this.renderMiniQuiz()}
            </Link>
        );
    }

    disabledQuiz() {
        const {toggleLoginDialog} = this.props;
        return (
            <div onClick={toggleLoginDialog}>
                {this.renderMiniQuiz()}
            </div>
        );
    }

    render() {
        const {userToken} = this.props;
        return userToken ? this.activeQuiz() : this.disabledQuiz();
    }
}

function mapStateToProps(state: AppState) {
    return {userToken: state.userState.userToken};
}

export default connect(mapStateToProps, {toggleLoginDialog})(MiniQuizView);
