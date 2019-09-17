import React, {Component} from 'react';
import Navbar from 'reactstrap/lib/Navbar';
import NavItem from 'reactstrap/lib/NavItem';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {UserToken} from '../../model/User';
import {getAttempt} from '../../redux/quiz/thunk';
import Attempt from '../../model/Attempt';
import Logo from '../../components/Logo';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';

interface QuizProps {
    attempt: Attempt
    userToken: UserToken;
    match: any;
    getAttempt: any
}

class QuizView extends Component<QuizProps> {
    componentDidMount() {
        const {userToken, match} = this.props;
        this.props.getAttempt(userToken.user, match.params.id);
    }

    renderToolbar() {
        return (
            <Navbar color="bg-light" light>
                <NavbarBrand>
                    <Logo />
                    <h1>QUIZ</h1>
                </NavbarBrand>

                <NavItem>
                    Timer
                </NavItem>
            </Navbar>
        );
    }

    render() {
        const {attempt} = this.props;

        return (
            <div>
                {this.renderToolbar()}
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        attempt: state.quizState.attempt,
        userToken: state.userState.userToken,
    };
}

export default connect(mapStateToProps, {getAttempt})(QuizView);
