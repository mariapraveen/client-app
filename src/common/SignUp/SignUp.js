import React from 'react';
import './SignUp.css';
import { userLoggedDetails } from './../Globals';
import { sendRequest } from '../Helpers/Helper';
import { Button, Form, Row, Col, Modal, Spinner } from 'react-bootstrap';

class SignUp extends React.Component {
    usernameRef;
    pwdRef;
    nameRef;
    statusRef;
    signOutBtnRef;
    constructor() {
        super();
        this.usernameRef = React.createRef();
        this.nameRef = React.createRef();
        this.pwdRef = React.createRef();
        this.statusRef = React.createRef();
        this.signOutBtnRef = React.createRef();
        this.state = {
            showDialog: false,
            disabled: true
        };
    }
    render() {
        return (<Modal show={this.state.showDialog} onHide={this.onDialogHide.bind(this)} className="m-signup-modal">
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">UserName</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.usernameRef} onKeyUp={this.validate.bind(this)} id="username" type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.nameRef} onKeyUp={this.validate.bind(this)} id="name" type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Password</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.pwdRef} onKeyUp={this.validate.bind(this)} id="pwd" type="password" />
                        </Col>
                    </Form.Group>
                </Form>
                <div ref={this.statusRef} className="m-signup-msg"></div>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={this.state.disabled} onClick={this.onSignUp.bind(this)} ref={this.signOutBtnRef} bsstyle="primary">
                    <Spinner
                        className="spinner"
                        as="span"
                        animation="border"
                        size="sm"
                    />
                    Sign Up
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

    onSignUp() {
        this.toggleSpinner(true);
        let userName = this.usernameRef.current.value;
        let name = this.nameRef.current.value;
        let pwd = this.pwdRef.current.value;
        let data = { username: userName, name: name };
        sendRequest('POST', 'signup', data, this.responseCb.bind(this), pwd);
    }

    toggleSpinner(show = false) {
        if (show) {
            this.signOutBtnRef.current.classList.add('m-signup-spinner')
        } else {
            this.signOutBtnRef.current.classList.remove('m-signup-spinner');
        }
    }

    validate() {
        let userName = this.usernameRef.current.value;
        let name = this.nameRef.current.value;
        let pwd = this.pwdRef.current.value;
        this.setState({ disabled: !(userName && name && pwd) })
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

export default SignUp;