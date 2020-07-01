import React from 'react';
import './SignIn.css';
import { userLoggedDetails } from './../Globals';
import { sendRequest } from '../Helpers/Helper';
import { Button, Form, Row, Col, Modal, Spinner } from 'react-bootstrap';


class SignIn extends React.Component {
    usernameRef;
    pwdRef;
    statusRef;
    signInBtnRef;
    showDialog;
    constructor() {
        super();
        this.usernameRef = React.createRef();
        this.pwdRef = React.createRef();
        this.statusRef = React.createRef();
        this.signInBtnRef = React.createRef();
        this.state = {
            showDialog: false,
            disabled: true
        };
    }

    render() {
        return (<Modal show={this.state.showDialog} onHide={this.onDialogHide.bind(this)} className="m-signin-modal">
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">UserName</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.usernameRef} onKeyUp={this.validate.bind(this)} id="username" type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Password</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.pwdRef} onKeyUp={this.validate.bind(this)} id="pwd" type="password" />
                        </Col>
                    </Form.Group>
                </Form>
                <div ref={this.statusRef} className="m-signin-msg"></div>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={this.state.disabled} onClick={this.onSignIn.bind(this)} ref={this.signInBtnRef} bsstyle="primary">
                    <Spinner
                        className="spinner"
                        as="span"
                        animation="border"
                        size="sm"
                    />
                    Sign In
                </Button>
            </Modal.Footer>
        </Modal>)
    }

    onDialogHide() {
        this.toggleDialog();
    }

    toggleDialog(show = false) {
        this.setState({ showDialog: show })
    }
    onSignIn(e) {
        this.toggleSpinner(true);
        let userName = this.usernameRef.current.value;
        let pwd = this.pwdRef.current.value;
        let data = { username: userName };
        sendRequest('POST', 'signin', data, this.responseCb.bind(this), pwd);
    }

    toggleSpinner(show = false) {
        if (show) {
            this.signInBtnRef.current.classList.add('m-signin-spinner')
        } else {
            this.signInBtnRef.current.classList.remove('m-signin-spinner');
        }
    }
    
    validate() {
        let userName = this.usernameRef.current.value;
        let pwd = this.pwdRef.current.value;
        this.setState({ disabled: !(userName && pwd) })
    }

    responseCb(response) {
        this.toggleSpinner();
        if (response.status === 'success') {
            userLoggedDetails.loggedIn = true;
            userLoggedDetails.username = response.msg.username;
            this.toggleDialog();
            window.location.hash = `${response.msg.username}`;
            this.props.refresh(response.msg.name);

        } else {
            userLoggedDetails.loggedIn = false;
            userLoggedDetails.username = undefined;
            this.statusRef.current.innerText = response.msg;
        }
    }
}

export default SignIn;