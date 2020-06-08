import React from 'react';

import AllUser from './AllUser/AllUser';
import IndividualUser from './IndividualUser/IndividualUser';


class User extends React.Component {
    constructor() {
        super();
        let hashDetails = this.getHashDetails();
        this.state = {
            isUser: hashDetails.isUser,
            name: hashDetails.name
        };
    }

    getHashDetails() {
        let pathArray = window.location.pathname.split('/');
        return {
            isUser: pathArray[1] ? true : false,
            name: pathArray[1]
        }
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
}

export default User;