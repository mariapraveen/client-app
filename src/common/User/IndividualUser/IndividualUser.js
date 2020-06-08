import React from 'react';

class IndividualUser extends React.Component {

    render() {
        return (<div>
            <h1>Welcome {this.props.name} !!!</h1>
        </div>)
    }
}

export default IndividualUser;