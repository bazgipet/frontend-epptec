import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../design/Post.css'

function Post({ title, author, content, comments_count, postId }) {
    const url = `/post/${postId}`;

    return (
        <a className="post" href={url}>
            <h3>{title}</h3>
            <FontAwesomeIcon icon={faUser} />
            <span className="author">{author}</span>
            <p className="truncate_text">{content}</p>
            <span className="comments_count">Comments({comments_count})</span>
        </a>
    );
}


export default Post