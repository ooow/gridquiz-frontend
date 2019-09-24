import React, {ChangeEvent, Component} from 'react';
import {Modal} from 'reactstrap';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import SendSVG from './../../assets/img/send.svg';
import CloseSVG from './../../assets/img/close.svg';
import {login} from '../../redux/user/thunk';
import {isEmail, isEmpty} from 'validator';
import {toggleAuthDialog} from '../../redux/user/action';
import {IconButton} from '@material-ui/core';
import Spinner from '../Spinner';
import './style.scss';

interface AuthDialogProps {
    isFetching: boolean;
    login: any;
    showAuthDialog: boolean;
    toggleAuthDialog: any;
}

interface AuthDialogState {
    valueEmail: string;
    valueName: string;
    valuePhone: string;
    validName: boolean;
    validEmail: boolean;
    firstClick: boolean;
}

const initState: AuthDialogState = {
    valueName: '',
    valueEmail: '',
    valuePhone: '',
    validName: false,
    validEmail: false,
    firstClick: true,
};

class AuthDialog extends Component<AuthDialogProps, AuthDialogState> {
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

    changePhone(event: ChangeEvent<HTMLInputElement>) {
        this.setState({valuePhone: event.target.value});
    }

    handleLogin() {
        const {valueName, valueEmail, valuePhone, validName, validEmail} = this.state;
        this.setState({firstClick: false});
        if (validName && validEmail) {
            this.props.login({
                name: valueName,
                email: valueEmail,
                phone: valuePhone,
            });
        }
    }

    renderForm() {
        const {valueName, valueEmail, valuePhone, validName, validEmail, firstClick} = this.state;
        const {toggleAuthDialog} = this.props;

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
            <div className='d-flex flex-column align-items-center'>
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
                    placeholder='Email'
                    required={true}
                    minLength={1}
                    maxLength={100}
                    className={emailClassName}
                    value={valueEmail}
                    onChange={this.changeEmail.bind(this)}
                />
                <input
                    type='text'
                    placeholder='Phone (optional)'
                    className='row input w-100 mt-4'
                    maxLength={25}
                    value={valuePhone}
                    onChange={this.changePhone.bind(this)}
                />
                <div className='row justify-content-end w-100 mt-4'>
                    <IconButton className='mr-3' onClick={toggleAuthDialog}>
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
        const {isFetching, showAuthDialog, toggleAuthDialog} = this.props;

        return (
            <Modal
                id='login-dialog'
                centered={true}
                fade={false}
                isOpen={showAuthDialog}
                toggle={toggleAuthDialog}
            >
                <div className='modal-content container p-4'>
                    <div className='row justify-content-center'>
                        <p className='title'>Registration</p>
                    </div>
                    {!isFetching ? this.renderForm() : <Spinner />}
                </div>
            </Modal>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        isFetching: state.userState.isFetching,
        showAuthDialog: state.userState.showAuthDialog,
    };
}

export default connect(mapStateToProps, {login, toggleAuthDialog})(AuthDialog);
