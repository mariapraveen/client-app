import React from 'react';

import CommonProfile from './CommonProfile/CommonProfile';
import PersonalProfile from './PersonalProfile/PersonalProfile';

import NotFound from '../NotFound/NotFound';
import { userLoggedDetails } from '../Globals';
import { sendRequest } from '../Helpers/Helper';
import Post from './Post/Post';


class Profile extends React.Component {
    constructor() {
        super();
        this.onHashChanged = this.onHashChanged.bind(this);
        let hashDetails = this.getHashDetails();
        this.state = {
            isUser: hashDetails.isUser,
            name: hashDetails.name,
            is404: hashDetails.is404,
            isOwnProfile: hashDetails.isOwnProfile,
            refresh: true
        };
        window.addEventListener('hashchange', this.onHashChanged);
    }

    refresh() {
        this.setState({ refresh: true});
    }

    getHashDetails() {
        let hashArray = window.location.hash.split('/');
        let isUser = hashArray[1] ? true : false;
        let userName = hashArray[1];
        let is404 = false;
        if (isUser) {
            if (userLoggedDetails.username === userName) {
                userLoggedDetails.isOwnProfile = true;
            } else {
                let data = { username: userName };
                let response = sendRequest('POST', 'exists', data);
                if (response.status === 'success') {

                } else {
                    is404 = true
                }
                userLoggedDetails.isOwnProfile = false;
            }
        }

        return {
            isUser: isUser,
            name: userName,
            is404: is404,
            isOwnProfile: userLoggedDetails.isOwnProfile
        }
    }

    onHashChanged() {
        let hashDetails = this.getHashDetails();
        this.setState({
            isUser: hashDetails.isUser,
            name: hashDetails.name,
            is404: hashDetails.is404,
            isOwnProfile: hashDetails.isOwnProfile
        });
    }
    getProfile() {
        if (this.state.is404) {
            return (<NotFound />);
        } else if (this.state.isUser && this.state.isOwnProfile) {
            return (<PersonalProfile name={this.state.name} refresh={this.refresh.bind(this)} />)
        } else {
            return (<CommonProfile name={this.state.name} isUser={this.state.isUser} />);
        }
    }
    
    render() {
        this.posts = this.getPost();
        return (<div>
            {this.getProfile()}
            <Post posts={this.posts} />
        </div>)
    }

    getPost() {
        let data = { username: this.state.name, start: 0, count: 10 };
        let method = this.state.isUser ? 'getuserpost' : 'getpost';
        return sendRequest('POST', method, data).msg;
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onHashChanged);
    }
}

export default Profile;