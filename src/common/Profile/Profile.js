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
        this.state = {
            isUser: false,
            name: '',
            is404: false,
            isOwnProfile: false,
            posts: []
        };
        window.addEventListener('hashchange', this.onHashChanged);
    }

    componentDidMount() {
        this.setHashDetails();
    }
    setHashDetails() {
        let hashArray = window.location.hash.split('/');
        this.state.isUser = hashArray[1] ? true : false;
        this.state.userName = hashArray[1] ? hashArray[1] : '';
        if (this.state.isUser) {
            if (userLoggedDetails.username === this.state.userName) {
                userLoggedDetails.isOwnProfile = true;
                this.getPost();
            } else {
                let data = { username: this.state.userName };
                sendRequest('POST', 'exists', data, this.responseExistCb.bind(this));
                userLoggedDetails.isOwnProfile = false;
            }
        } else {
            this.getPost();
        }

        this.setState({
            isUser: this.state.isUser,
            isOwnProfile: userLoggedDetails.isOwnProfile,
            name: this.state.userName
        });
    }

    onHashChanged() {
        this.setHashDetails();
    }

    getProfile() {
        if (this.state.is404) {
            return (<NotFound />);
        } else if (this.state.isUser && this.state.isOwnProfile) {
            return (<PersonalProfile name={this.state.name} refreshPost={this.refreshPost.bind(this)} />)
        } else {
            return (<CommonProfile name={this.state.name} isUser={this.state.isUser} />);
        }
    }

    render() {
        return (<div>
            {this.getProfile()}
            <Post posts={this.state.posts} />
        </div>)
    }

    refreshPost() {
        this.getPost();
    }

    getPost() {
        let data = { username: this.state.name, start: 0, count: 5 };
        let method = this.state.isUser ? 'getuserpost' : 'getpost';
        sendRequest('POST', method, data, this.responsePostCb.bind(this));
    }

    responsePostCb(response) {
        this.setState({ posts: response.msg });
    }

    responseExistCb(response) {
        if (response.status === 'success') {
            this.getPost();
        } else {
            this.setState({ is404: true });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onHashChanged);
    }
}

export default Profile;