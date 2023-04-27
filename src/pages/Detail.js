import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../design/Detail.css'

function Detail() {
    const [user, setUser] = useState({})
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    // Get postId
    const { postId } = useParams();
    console.log(postId)

    useEffect(() => {


        const fetchData = async () => {

            // Get selected post
            const response_post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            let data_post = await response_post.json();

            setPost(data_post)

            // get comments to selected post
            const response_comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            let data_comments = await response_comments.json();

            setComments(data_comments)

            // get users and select one by his id
            const response_users = await fetch('https://jsonplaceholder.typicode.com/users');
            let data_users = await response_users.json();
            const user_found = data_users.find((el) => {
                if (el.id === data_post.userId) {
                    return true
                } else {
                    return false;
                }
            })

            setUser(user_found)


        };

        fetchData();
    }, []);


    return (
        <section className='detail_section'>
            <main className='detail_post'>
                <h1>{post.title}</h1>
                <FontAwesomeIcon icon={faUser} />
                <span className='user_name'>{user.name}</span>
                <p className='post_txt'>{post.body}</p>
            </main>

            <section className='comment_part'>
                <h2>Comments</h2>
                {comments.map((comment) => {
                    return (
                        <article className='comment_detail'>
                            <h3>{comment.name}</h3>
                            <span>{comment.email}</span>
                            <p>{comment.body}</p>
                        </article>
                    );
                })}
            </section>
        </section>

    )
}

export default Detail