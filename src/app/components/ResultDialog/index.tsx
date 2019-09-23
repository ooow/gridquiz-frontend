import React, {Component, CSSProperties} from 'react';
import {Modal} from 'reactstrap';
import {Link} from 'react-router-dom';
import './style.scss';
import Result from '../../model/Result';

interface ResultDialogProps {
    result: Result;
    resultColor: string;
    onClick?: any;
}

class ResultDialog extends Component<ResultDialogProps> {
    render() {
        const {result, resultColor, onClick} = this.props;
        const lingStyle: CSSProperties = {border: `1px solid ${resultColor}`};

        return (
            <Modal
                id='result-dialog'
                centered={true}
                fade={false}
                isOpen={true}
            >
                <div className='modal-content container p-5'>
                    <div className='row justify-content-center'>
                        <p className='title'>Well done!</p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='result' style={{color: resultColor}}>
                            {`${result.points}/${result.outOf}`}
                        </p>
                    </div>
                    <p className='row text-center subtitle w-100 mb-3'>
                        You got great results. Well done! For sure, our HRs will
                        be in love with you!
                    </p>
                    <div className='row justify-content-center mt-3'>
                        <Link
                            to={`/dashboard/${result.quizId}`}
                            className='link cursor-pointer'
                            style={lingStyle}
                            onClick={onClick}
                        >
                            See the results
                        </Link>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ResultDialog;
