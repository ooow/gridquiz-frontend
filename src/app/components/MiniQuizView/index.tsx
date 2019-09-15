import React, {Component} from 'react';
import Pattern from '../../assets/img/background_pattern.svg';
import MiniQuiz from '../../model/MiniQuiz';
import {Link} from 'react-router-dom';

interface MainQuizProp {
    miniQuiz: MiniQuiz;
}

class MiniQuizView extends Component<MainQuizProp> {
    render() {
        const {miniQuiz} = this.props;
        let background = `url(${Pattern}), linear-gradient(180deg,
                         ${miniQuiz.colors[0]} 0%, ${miniQuiz.colors[1]} 100%)`;
        return (
            <Link
                to={{
                    pathname: '/quiz',
                    state: {miniQuiz},
                }}
                className='card wh-250px cursor-pointer m-5'
                style={{background: background}}
            >
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h3 className="card-title text-white">
                        {miniQuiz.name}
                    </h3>
                    <h5 className="card-subtitle mt-4 text-white">
                        {miniQuiz.description}
                    </h5>
                    <p className="text-white">
                        {miniQuiz.questionsComplete} / {miniQuiz.questionsSize}
                    </p>
                </div>
            </Link>
        );
    }
}

export default MiniQuizView;
