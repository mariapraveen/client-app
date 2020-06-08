import React from 'react';
import { APIURL } from './../Globals';
import $ from 'jquery';
import './SignIn.css';


class SignIn extends React.Component {
    usernameRef;
    pwdRef;
    statusRef;
    constructor() {
        super();
        this.usernameRef = React.createRef();
        this.pwdRef = React.createRef();
        this.statusRef = React.createRef();
    }

    render() {
        return (<div className="modal m-signin-modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sign In</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input type="text" ref={this.usernameRef} required className="form-control" id="username" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="pwd" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" ref={this.pwdRef} required className="form-control" id="pwd" />
                            </div>
                        </div>
                        <div ref={this.statusRef} className="m-signin-msg"></div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.onSignIn.bind(this)} className="btn btn-primary">Sign In</button>
                    </div>
                </div>
            </div>
        </div>)
    }

    onSignIn(e) {
        let userName = this.usernameRef.current.value;
        let pwd = this.pwdRef.current.value;
        let data = { username: userName, pwd: pwd };
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', `${APIURL}/signin`, false);
        httpRequest.setRequestHeader('Content-Type', 'plain/text');
        httpRequest.send(JSON.stringify(data));
        let response = JSON.parse(httpRequest.responseText);
        if (response.status === 'success') {
            $('.m-signin-modal').modal('hide');
            window.location.hash = `${response.msg.username}`;
            
        } else {
            this.statusRef.current.innerText = response.msg;
        }
    }
}

export default SignIn;