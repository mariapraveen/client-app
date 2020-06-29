import React from 'react';
import './SignIn.css';
import { userLoggedDetails } from './../Globals';
import { sendRequest } from '../Helpers/Helper';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';


class SignIn extends React.Component {
    usernameRef;
    pwdRef;
    statusRef;
    showDialog;
    constructor() {
        super();
        this.usernameRef = React.createRef();
        this.pwdRef = React.createRef();
        this.statusRef = React.createRef();
        this.state = {
            showDialog: false
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
                            <Form.Control ref={this.usernameRef} id="username" type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Password</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.pwdRef} id="pwd" type="password" />
                        </Col>
                    </Form.Group>
                </Form>
                <div ref={this.statusRef} className="m-signin-msg"></div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.onSignIn.bind(this)} bsstyle="primary">Sign In</Button>
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
        let userName = this.usernameRef.current.value;
        let pwd = this.pwdRef.current.value;
        let data = { username: userName };
        let response = sendRequest('POST', 'signin', data, pwd);
        if (response.status === 'success') {
            userLoggedDetails.loggedIn = true;
            userLoggedDetails.username = data.username;
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