import React from 'react';
import './Post.css';
import { getDateInfo } from './../../Helpers/Helper';

class Post extends React.Component {

    render() {
        return (<div>
            {this.props.posts.map((post, i) => (
                <div className="m-post-container" key={i}>
                    <div className="m-post-info-container">
                        <div className="m-post-info-profile">
                            <a href={"/#" + post.username}>
                                <i className="fas fa-user-circle"></i>
                            </a>
                            <div className="m-post-info-user">{post.name}</div>
                        </div>
                        <div className="m-post-info-date-container">
                            <div className="m-post-info-date">{this.getDate(post.created)}</div>
                            <div className="m-post-info-date">{new Date(post.created).toLocaleTimeString()}</div>
                        </div>
                    </div>
                    <div className="m-post-img">
                        <img src={post.img} alt="loading" />
                    </div>
                    <div className="m-post-caption">{post.caption}</div>
                </div>
            ))}
        </div>)
    }

    getDate(time) {
        let dataInfo = getDateInfo(time);
        return `${dataInfo.day}, ${dataInfo.month} ${dataInfo.date} ${dataInfo.year}`;
    }

}

export default Post;