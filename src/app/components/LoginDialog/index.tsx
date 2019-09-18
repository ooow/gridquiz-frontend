import React, {ChangeEvent, Component, FormEvent} from 'react';
import {Modal} from 'reactstrap';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {login} from '../../redux/user/thunk';
import {toggleLoginDialog} from '../../redux/user/action';

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

    handleLogin(event: FormEvent<HTMLFormElement>) {
        const {valueName, valueEmail} = this.state;
        this.props.login({name: valueName, email: valueEmail});
        event.preventDefault();
    }

    showSpinner() {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    showForm() {
        const {valueName, valueEmail} = this.state;
        return (
            <form
                className='d-flex flex-column w-100'
                onSubmit={this.handleLogin.bind(this)}
            >
                <input
                    className='my-3'
                    type='text'
                    placeholder='Name'
                    value={valueName}
                    onChange={this.changeName.bind(this)}
                />
                <input
                    className='my-3'
                    type='text'
                    placeholder='Email or Phone'
                    value={valueEmail}
                    onChange={this.changeEmail.bind(this)}
                />
                <input type="submit" value="Login" />
            </form>
        );
    }

    render() {
        const {isFetching, showLoginDialog, toggleLoginDialog} = this.props;

        return (
            <Modal
                fade={false}
                isOpen={showLoginDialog}
                toggle={toggleLoginDialog}
            >
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='modal-title'>
                            Registration
                        </div>
                        <button
                            className='btn'
                            type='button'
                            onClick={toggleLoginDialog}
                        >
                            Close
                        </button>
                    </div>
                    <div className='modal-body d-flex justify-content-center'>
                        {isFetching && this.showSpinner()}
                        {!isFetching && this.showForm()}
                    </div>
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
