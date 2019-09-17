import React, {Component, CSSProperties} from 'react';
import MiniQuiz from '../../model/MiniQuiz';
import {Link} from 'react-router-dom';
import {AppState} from '../../redux/reducers';
import {connect} from 'react-redux';
import {toggleLoginDialog} from '../../redux/user/action';
import {UserToken} from '../../model/User';

const defaultColor = '#197E92';

interface MainQuizProp {
    miniQuiz: MiniQuiz;
    userToken?: UserToken,
    toggleLoginDialog: any;
}

class MiniQuizView extends Component<MainQuizProp> {
    renderMiniQuiz() {
        const {miniQuiz} = this.props;
        return (
            <div className='card-body d-flex flex-column align-items-center justify-content-center'>
                <h3 className='card-title text-white'>
                    {miniQuiz.name}
                </h3>
                <h5 className='card-subtitle mt-4 text-white'>
                    {miniQuiz.description}
                </h5>
                <p className='text-white'>
                    {miniQuiz.questionsComplete} / {miniQuiz.questionsSize}
                </p>
            </div>
        );
    }

    render() {
        const {miniQuiz, userToken, toggleLoginDialog} = this.props;
        let className = 'start-quiz-link card wh-250px cursor-pointer m-5';
        let link = `/quiz/${miniQuiz.id}`;
        let style: CSSProperties = {background: miniQuiz.color || defaultColor};

        if (miniQuiz.attempt) {
            link = '#';
            className += ' disabled';
            style = {...style, opacity: 0.5};
        }
        return userToken ? (
            <Link to={link} className={className} style={style}>
                {this.renderMiniQuiz()}
            </Link>
        ) : (
            <div
                className={className}
                onClick={toggleLoginDialog}
                style={style}
            >
                {this.renderMiniQuiz()}
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {userToken: state.userState.userToken};
}

export default connect(mapStateToProps, {toggleLoginDialog})(MiniQuizView);
