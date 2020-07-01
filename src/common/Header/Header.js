import React from 'react';
import './Header.css';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

import { userLoggedDetails } from './../Globals';
import { Dropdown } from 'react-bootstrap';

class Header extends React.Component {
    signinRef;
    signupRef;
    themeCookieName = 'm-theme';
    constructor() {
        super();
        this.state = { refresh: true, name: undefined, checked: false };
        this.signinRef = React.createRef();
        this.signupRef = React.createRef();
    }
    componentDidMount() {
        this.initializeTheme();
    }

    refresh(name = undefined) {
        this.setState({ refresh: true, name: name });
    }
    render() {
        return (
            <div className="m-header-container">
                <div className="m-header-left-container">
                    <a href="/" className="m-header-name">
                        <div>ARTLY</div>
                    </a>
                </div>
                <div className="m-header-right-container">
                    <div className="m-profile-salutation">Howdy {this.state.name ? this.state.name : 'Guest'} !!</div>
                    <Dropdown id="m-dropdownMenu" className="m-profile-dropdown" alignRight >
                        <Dropdown.Toggle id="dropdown-basic" className="m-ddn">
                            <div className="m-user-icon">
                                <i className="fas fa-user-circle"></i>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {userLoggedDetails.loggedIn ? (
                                <div>
                                    <Dropdown.Item>{userLoggedDetails.username}</Dropdown.Item>
                                    <Dropdown.Item onClick={this.onSignOut.bind(this)}>Sign Out</Dropdown.Item>
                                </div>
                            ) : (<div>
                                <Dropdown.Item onClick={this.onSignIn.bind(this)}>Sign In</Dropdown.Item>
                                <Dropdown.Item onClick={this.onSignUp.bind(this)}>Sign Up</Dropdown.Item>
                            </div>
                                )}
                            <div className="m-theme">
                                Dark Theme
                            <label className="switch">
                                    <input type="checkbox" checked={this.state.checked} onChange={this.onThemeChange.bind(this)} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </Dropdown.Menu>
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

    initializeTheme() {
        let theme = this.getThemeCookie();
        if (theme === 'dark') {
            this.setState({ checked: true });
            document.body.classList.add('m-dark-theme');
        }
    }

    onThemeChange(e) {
        this.setState({ checked: e.target.checked });
        if (e.target.checked) {
            document.body.classList.add('m-dark-theme');
            this.setThemeCookie('dark');
        } else {
            document.body.classList.remove('m-dark-theme');
            this.setThemeCookie('light');
        }
    }

    getThemeCookie() {
        let theme = 'light'
        document.cookie.split(';').some((cookie) => {
            let spllitedCookie = cookie.trim().split('=');
            let name = spllitedCookie[0].trim();
            if (this.themeCookieName === name) {
                theme = spllitedCookie[1].trim();
                return true;
            } else {
                return false;
            }
        });
        return theme;
    }

    setThemeCookie(theme) {
        document.cookie = `m-theme=${theme}; expires=Thu, 25 Dec 2039 12:00:00 UTC; path=/`;
    }
}

export default Header;