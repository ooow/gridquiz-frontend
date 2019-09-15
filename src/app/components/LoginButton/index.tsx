import React, {ChangeEvent, Component, FormEvent} from 'react';
import {Modal} from 'reactstrap';
import LockSvg from './../../assets/img/lock.svg';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {login} from '../../redux/user/thunk';

interface LoginButtonProps {
    isFetching: boolean,
    login: any;
}

interface LoginButtonState {
    isDialogOpen: boolean,
    valueEmail: string,
    valueName: string,
}

class LoginButton extends Component<LoginButtonProps, LoginButtonState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isDialogOpen: false,
            valueName: '',
            valueEmail: '',
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState((prevState: any) => ({isDialogOpen: !prevState.isDialogOpen}));
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
        const {isDialogOpen} = this.state;
        const {isFetching} = this.props;

        return (
            <div>
                <img
                    alt='Login button'
                    className='cursor-pointer'
                    onClick={this.toggle}
                    src={LockSvg}
                />

                <Modal fade={false} isOpen={isDialogOpen} toggle={this.toggle}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='modal-title'>
                                Registration
                            </div>
                            <button
                                className='btn'
                                type='button'
                                onClick={this.toggle}
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
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {isFetching: state.userState.isFetching};
}

export default connect(mapStateToProps, {login})(LoginButton);
