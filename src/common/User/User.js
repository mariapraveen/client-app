import React from 'react';

import AllUser from './AllUser/AllUser';
import IndividualUser from './IndividualUser/IndividualUser';


class User extends React.Component {
    constructor() {
        super();
        this.onHashChanged = this.onHashChanged.bind(this);
        let hashDetails = this.getHashDetails();
        this.state = {
            isUser: hashDetails.isUser,
            name: hashDetails.name
        };
        window.addEventListener('hashchange', this.onHashChanged);

    }

    getHashDetails() {
        let hashArray = window.location.hash.split('/');
        return {
            isUser: hashArray[1] ? true : false,
            name: hashArray[1]
        }
    }

    onHashChanged() {
        let hashDetails = this.getHashDetails();
        this.setState({
            isUser: hashDetails.isUser,
            name: hashDetails.name
        });
    }
    getUserComponent() {
        if (!this.state.isUser) {
            return (<AllUser />);
        } else {
            return (<IndividualUser name={this.state.name} />)
        }
    }
    render() {
        return (<div>
            {this.getUserComponent()}
        </div>)
    }
    
    componentWillUnmount(){
        window.removeEventListener('hashchange', this.onHashChanged);
    }
}

export default User;