import React from 'react';
import $ from 'jquery';
import './Header.css';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

class Header extends React.Component {
    render() {
        return (
            <div className="m-header-container">
                <div className="m-header-left-container">
                    <div className="m-header-name">ARTLY</div>
                </div>
                <div className="m-header-right-container">
                    <div className="m-profile-dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="m-dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="m-user-icon">
                                <i className="fas fa-user-circle"></i>
                            </div>
                        </button>
                        <div className="dropdown-menu dropdown-menu-lg-left" aria-labelledby="m-dropdownMenu">
                            <button className="dropdown-item" onClick={this.onSignIn.bind(this)} type="button">Sign in</button>
                            <button className="dropdown-item" onClick={this.onSignUp.bind(this)} type="button">Sign up</button>
                        </div>
                    </div>
                </div>
                <SignIn />
                <SignUp />
            </div>
        );
    }

    onSignUp(e) {
        $('.m-signup-modal').modal({
            show: true
        });
    }
    onSignIn(e) {
        $('.m-signin-modal').modal({
            show: true
        });
    }
}

export default Header;