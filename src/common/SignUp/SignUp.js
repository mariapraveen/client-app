import React from 'react';
import './SignUp.css';
import { userLoggedDetails } from './../Globals';
import { sendRequest } from '../Helpers/Helper';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';

class SignUp extends React.Component {
    usernameRef;
    pwdRef;
    nameRef;
    statusRef;
    constructor() {
        super();
        this.usernameRef = React.createRef();
        this.nameRef = React.createRef();
        this.pwdRef = React.createRef();
        this.statusRef = React.createRef();
        this.state = {
            showDialog: false
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
                            <Form.Control ref={this.usernameRef} id="username" type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.nameRef} id="name" type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Password</Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.pwdRef} id="pwd" type="password" />
                        </Col>
                    </Form.Group>
                </Form>
                <div ref={this.statusRef} className="m-signup-msg"></div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.onSignUp.bind(this)} bsstyle="primary">Sign Up</Button>
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
        let userName = this.usernameRef.current.value;
        let name = this.nameRef.current.value;
        let pwd = this.pwdRef.current.value;
        let data = { username: userName, name: name };
        let response = sendRequest('POST', 'signup', data, pwd);
        if (response.status === 'success') {
            userLoggedDetails.loggedIn = true;
            userLoggedDetails.username = data.username;
            this.toggleDialog();
            window.location.hash = `${response.msg.username}`;
            this.props.refresh(name);
        } else {
            userLoggedDetails.loggedIn = false;
            userLoggedDetails.username = undefined;
            this.statusRef.current.innerText = response.msg;
        }
    }
}

export default SignUp;