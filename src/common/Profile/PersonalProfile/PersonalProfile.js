import React from 'react';
import AddPost from './AddPost/AddPost';
import './PersonalProfile.css';

class Profile extends React.Component {
    addPostRef;
    constructor() {
        super();
        this.addPostRef = React.createRef();
    }
    render() {
        return (<div className="m-personal-profile-container">
            <button type="button" onClick={this.addPost.bind(this)} className="btn btn-primary m-add-post-btn">Add Post</button>
            <AddPost refresh={this.props.refresh.bind(this)} ref={this.addPostRef} />
        </div>)
    }

    addPost(e) {
        this.addPostRef.current.toggleDialog(true);
    }
}

export default Profile;