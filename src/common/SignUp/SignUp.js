import React from 'react';
import './SignUp.css';

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
    }
    render() {
        return (<div className="modal m-signup-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Sign Up</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">User</label>
                        <div className="col-sm-10">
                            <input type="text" ref={this.usernameRef} className="form-control" id="username" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" ref={this.nameRef} className="form-control" id="name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="pwd" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" ref={this.pwdRef} className="form-control" id="pwd" />
                        </div>
                    </div>
                    <div ref={this.statusRef}  className="m-signup-msg"></div>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={this.onSignUp.bind(this)} className="btn btn-primary">Sign In</button>
                </div>
            </div>
        </div>
    </div>)
    }

    onSignUp(e) {
        let userName = this.usernameRef.current.value;
        let name = this.nameRef.current.value;
        let pwd = this.pwdRef.current.value;
        let data = { username: userName, name: name, pwd: pwd };
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'http://ec2-52-66-132-178.ap-south-1.compute.amazonaws.com:9000/signup', false);
        httpRequest.setRequestHeader('Content-Type', 'plain/text');
        httpRequest.send(JSON.stringify(data));
        this.statusRef.current.innerText = httpRequest.responseText;
    }
}

export default SignUp;