import React, {Component} from 'react';
import {Modal} from 'reactstrap';
import LockSvg from './../../assets/img/lock.svg'

class LoginButton extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            isDialogOpen: false,
            valueName: '',
            valueEmail: '',
            valuePhone: '',
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState((prevState: any) => ({isDialogOpen: !prevState.isDialogOpen}));
    }

    changeName(event: any) {
        this.setState({valueName: event.target.value});
    }

    changeEmail(event: any) {
        this.setState({valueEmail: event.target.value});
    }

    changePhoto(event: any) {
        this.setState({valuePhoto: event.target.value});
    }

    render() {
        const {isDialogOpen, valueName, valueEmail, valuePhone} = this.state;

        return (
            <div>
                <img className='cursor-pointer' onClick={this.toggle} src={LockSvg} />

                <Modal fade={false} isOpen={isDialogOpen} toggle={this.toggle}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='modal-title'>
                                Registration
                            </div>
                            <button
                                className='btn btn-link close'
                                type='button'
                                onClick={this.toggle}
                            >
                            </button>
                        </div>
                        <div className='modal-body'>
                            <form>
                                <input
                                    type="text"
                                    value={valueName}
                                    onChange={this.changeName.bind(this)}
                                />
                                <input
                                    type="text"
                                    value={valueEmail}
                                    onChange={this.changeEmail.bind(this)}
                                />
                                <input
                                    type="text"
                                    value={valuePhone}
                                    onChange={this.changePhoto.bind(this)}
                                />
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default LoginButton;
