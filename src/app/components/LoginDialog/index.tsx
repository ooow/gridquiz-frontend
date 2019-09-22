import React, {ChangeEvent, Component} from 'react';
import {Modal} from 'reactstrap';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import SendSVG from './../../assets/img/send.svg';
import CloseSVG from './../../assets/img/close.svg';
import {login} from '../../redux/user/thunk';
import {isEmail, isEmpty} from 'validator';
import {toggleLoginDialog} from '../../redux/user/action';
import {IconButton} from '@material-ui/core';
import './style.scss';

interface LoginDialogProps {
    isFetching: boolean,
    login: any;
    showLoginDialog: boolean,
    toggleLoginDialog: any,
}

interface LoginDialogState {
    valueEmail: string;
    valueName: string;
    validName: boolean;
    validEmail: boolean;
    firstClick: boolean;
}

const initState: LoginDialogState = {
    valueName: '',
    valueEmail: '',
    validName: false,
    validEmail: false,
    firstClick: true,
};

class LoginDialog extends Component<LoginDialogProps, LoginDialogState> {
    constructor(props: any) {
        super(props);

        this.state = initState;
    }

    changeName(event: ChangeEvent<HTMLInputElement>) {
        const isNameValid = !isEmpty(event.target.value);
        this.setState({valueName: event.target.value});
        this.setState({validName: isNameValid});
    }

    changeEmail(event: ChangeEvent<HTMLInputElement>) {
        const isEmailValid = isEmail(event.target.value);
        this.setState({valueEmail: event.target.value});
        this.setState({validEmail: isEmailValid});
    }

    handleLogin() {
        const {valueName, valueEmail, validName, validEmail} = this.state;
        this.setState({firstClick: false});
        if (validName && validEmail) {
            this.props.login({name: valueName, email: valueEmail});
        }
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
        const {valueName, valueEmail, validName, validEmail, firstClick} = this.state;
        const {toggleLoginDialog} = this.props;

        let nameClassName = 'row input w-100 mt-4';
        let emailClassName = 'row input w-100 mt-4';

        if (!firstClick) {
            if (!validName) {
                nameClassName += ' invalid';
            }
            if (!validEmail) {
                emailClassName += ' invalid';
            }
        }

        return (
            <div className='container'>
                <p className='row text-center subtitle w-100 mb-3'>
                    You might be a Winner! And we’d like to have a chance to
                    contact with you to bring you prize. Goodluck!
                </p>
                <input
                    type='text'
                    placeholder='Name Surname'
                    required={true}
                    minLength={1}
                    maxLength={100}
                    className={nameClassName}
                    value={valueName}
                    onChange={this.changeName.bind(this)}
                />
                <input
                    type='text'
                    placeholder='Email or Phone'
                    required={true}
                    minLength={1}
                    maxLength={100}
                    className={emailClassName}
                    value={valueEmail}
                    onChange={this.changeEmail.bind(this)}
                />
                <div className='row justify-content-end w-100 mt-4'>
                    <IconButton className='mr-3' onClick={toggleLoginDialog}>
                        <img
                            alt='Close dialog window button'
                            src={CloseSVG}
                        />
                    </IconButton>
                    <IconButton onClick={this.handleLogin.bind(this)}>
                        <img alt='Login button' src={SendSVG} />
                    </IconButton>
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
