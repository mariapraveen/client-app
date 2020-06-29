import React from 'react';
import './Header.css';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

import { userLoggedDetails } from './../Globals';
import { Dropdown } from 'react-bootstrap';

class Header extends React.Component {
    signinRef;
    signupRef;
    constructor() {
        super();
        this.state = { refresh: true, name: undefined };
        this.signinRef = React.createRef();
        this.signupRef = React.createRef();
    }
    refresh(name = undefined) {
        this.setState({ refresh: true, name: name });
    }
    render() {
        return (
            <div className="m-header-container">
                <div className="m-header-left-container">
                    <div className="m-header-name">ARTLY</div>
                </div>
                <div className="m-header-right-container">
                    <div className="m-profile-salutation">Howdy {this.state.name ? this.state.name : 'Guest'} !!</div>
                    <Dropdown id="m-dropdownMenu" className="m-profile-dropdown" >
                        <Dropdown.Toggle id="dropdown-basic" className="m-ddn">
                            <div className="m-user-icon">
                                <i className="fas fa-user-circle"></i>
                            </div>
                        </Dropdown.Toggle>
                        {userLoggedDetails.loggedIn ? (
                            <Dropdown.Menu>
                                <Dropdown.Item>{userLoggedDetails.username}</Dropdown.Item>
                                <Dropdown.Item onClick={this.onSignOut.bind(this)}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>

                        ) : (<Dropdown.Menu>
                            <Dropdown.Item onClick={this.onSignIn.bind(this)}>Sign In</Dropdown.Item>
                            <Dropdown.Item onClick={this.onSignUp.bind(this)}>Sign Up</Dropdown.Item>
                        </Dropdown.Menu>

                            )}
                    </Dropdown>
                </div>
                <SignIn refresh={this.refresh.bind(this)} ref={this.signinRef} />
                <SignUp refresh={this.refresh.bind(this)} ref={this.signupRef} />
            </div>
        );
    }

    onSignUp(e) {
        this.signupRef.current.toggleDialog(true);
    }

    onSignOut(e) {
        userLoggedDetails.loggedIn = false;
        userLoggedDetails.username = undefined;
        window.location.hash = ``;
        this.refresh();
    }
    onSignIn(e) {
        this.signinRef.current.toggleDialog(true);
    }
}

export default Header;