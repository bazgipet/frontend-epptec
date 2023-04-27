import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Post from '../components/Post'
import Pagination from '../components/Pagination';
import '../design/Home.css'

function Home() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [max, setMax] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageId = queryParams.get('pageId') ?? 1;

    useEffect(() => {
        const fetchData = async () => {
            // Get all posts
            const response_posts = await fetch('https://jsonplaceholder.typicode.com/posts');
            let data_posts = await response_posts.json();
            let from = 10 * (pageId - 1);
            let to = pageId * 10;
            if (to >= data_posts.length) {
                to=data_posts.length
                setMax(true)
            }
            from < 0 ? from=0 : from=from;
            console.log(to, from)
            data_posts = data_posts.slice(from, to)

            const post_userId = new Set() // Set holding userId 
            const post_id = new Set() // Set holidng post Id
            data_posts.forEach((post) => {
                post_userId.add(post.userId)
                post_id.add(post.id)
            });

            setPosts(data_posts);

            // Get all users
            const response_users = await fetch('https://jsonplaceholder.typicode.com/users');
            let data_users = await response_users.json();

            data_users = data_users.filter((user) => {
                if (post_userId.has(user.id)) {
                    return true;
                } else {
                    return false;
                }
            });

            setUsers(data_users)

            // Get all comments
            const response_comments = await fetch('https://jsonplaceholder.typicode.com/comments');
            let data_comments = await response_comments.json();

            data_comments = data_comments.filter((comment) => {
                if (post_id.has(comment.postId)) {
                    return true;
                } else {
                    return false;
                }
            })

            setComments(data_comments);
        };

        fetchData();
    }, []);

    const count_comments = (post_id) => {
        return comments.reduce((accumulator, current) => {
            return current.postId === post_id ? accumulator + 1 : accumulator;
        }, 0);
    }

    const get_username = (userId) => {

        const searched_user = users.find((usr) => {
            if (usr.id === userId) {
                return true;
            } else {
                return false;
            }
        })
        if (searched_user) {
            return searched_user.name
        }
        return '';

    }

    return (
        <section>
            <aside className='main_wall'>
                <h1>Latine Vivere</h1>
                <p>Join our community of Latin writers and speakers to engage in discussions and share your work</p>
            </aside>

            <main className='post_home'>
                <h2>Posts</h2>
                <section className='posts'>
                    {posts.map((post) => (
                        <Post key={post.id}
                            title={post.title}
                            author={get_username(post.userId)}
                            content={post.body}
                            comments_count={count_comments(post.id)}
                            postId={post.id} />
                    ))}
                </section>

            </main>
            <Pagination max={max} page={pageId} />
        </section>

    )
}

export default Home