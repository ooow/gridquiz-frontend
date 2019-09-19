import React, {ChangeEvent, Component} from 'react';
import {Modal} from 'reactstrap';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import SendSVG from './../../assets/img/send.svg';
import CloseSVG from './../../assets/img/close.svg';
import {login} from '../../redux/user/thunk';
import {toggleLoginDialog} from '../../redux/user/action';
import './style.scss';

interface LoginDialogProps {
    isFetching: boolean,
    login: any;
    showLoginDialog: boolean,
    toggleLoginDialog: any,
}

interface LoginDialogState {
    valueEmail: string,
    valueName: string,
}

const initState: LoginDialogState = {
    valueName: '',
    valueEmail: '',
};

class LoginDialog extends Component<LoginDialogProps, LoginDialogState> {
    constructor(props: any) {
        super(props);

        this.state = initState;
    }

    changeName(event: ChangeEvent<HTMLInputElement>) {
        this.setState({valueName: event.target.value});
    }

    changeEmail(event: ChangeEvent<HTMLInputElement>) {
        this.setState({valueEmail: event.target.value});
    }

    handleLogin() {
        const {valueName, valueEmail} = this.state;
        this.props.login({name: valueName, email: valueEmail});
    }

    renderSpinner() {
        return (
            <div className='row justify-content-center'>
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    renderForm() {
        const {valueName, valueEmail} = this.state;
        const {toggleLoginDialog} = this.props;

        return (
            <div className='container'>
                <p className='row text-center subtitle w-100 mb-3'>
                    You might be a Winner! And we’d like to have a chance to
                    contact with you to bring you prize. Goodluck!
                </p>
                <input
                    className='row input w-100 mt-4'
                    type='text'
                    placeholder='Name Surname'
                    value={valueName}
                    onChange={this.changeName.bind(this)}
                />
                <input
                    className='row input w-100 mt-4'
                    type='text'
                    placeholder='Email or Phone'
                    value={valueEmail}
                    onChange={this.changeEmail.bind(this)}
                />
                <div className='row justify-content-end w-100 mt-4'>
                    <img
                        alt='Close dialog window button'
                        className='cursor-pointer mr-3'
                        src={CloseSVG}
                        onClick={toggleLoginDialog}
                    />
                    <img
                        alt='Login button'
                        className='cursor-pointer'
                        src={SendSVG}
                        onClick={this.handleLogin.bind(this)}
                    />
                </div>
            </div>
        );
    }

    render() {
        const {isFetching, showLoginDialog, toggleLoginDialog} = this.props;

        return (
            <Modal
                id='login-dialog'
                centered={true}
                fade={false}
                isOpen={showLoginDialog}
                toggle={toggleLoginDialog}
            >
                <div className='modal-content container p-5'>
                    <div className='row justify-content-center'>
                        <p className='title'>Registration</p>
                    </div>
                    {isFetching && this.renderSpinner()}
                    {!isFetching && this.renderForm()}
                </div>
            </Modal>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        isFetching: state.userState.isFetching,
        showLoginDialog: state.userState.showLoginDialog,
    };
}

export default connect(
    mapStateToProps, {login, toggleLoginDialog},
)(LoginDialog);
