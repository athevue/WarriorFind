import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import { collection, getDocs, where, query, doc, deleteDoc} from "firebase/firestore";
import './Profile.css'
import './Feed.css'
import './Home.css'
import ImageCarousel from './components/imageCarousel';
import corkboard from "./assets/cork-board.jpg.avif";
import EditPostPopup from './components/EditPostPopup';

function Profile() {
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = 1 //temporary constant, use id of signed in user instead

    const getUser = async () => {
        const user = await getDocs(query(collection(db, "users"), where("user_id", "==", userId)));
        setUser(user.docs[0].data());
    }

    const getPosts = async () => {
        setPosts([]);

        try {
            const fetchedPosts = await getDocs(query(collection(db, "posts"), where("user_id", "==", userId)));

            const postsArray = [];
            fetchedPosts.forEach(post => {
                postsArray.push(post);
            });
            setPosts(postsArray);
        } catch(err) {
            console.log(err.message);
        }
    }
    
    const editPost = (postId) => {
        //redirect 
    }

    const deletePost = async (postId) => {
        await deleteDoc(doc(db, "posts", postId));
        setPosts(posts.filter(post => post.id != postId));
    }

    useEffect(() => {
        getUser();
        getPosts();
        setLoading(false);
    }, []);

    if (loading || !user || !posts) 
        return (
            <h1>loading...</h1>
        );

  return (
    <div
        className="home-page profile-container"
        style={{ backgroundImage: `url(${corkboard})` }}
    >
        <div className='post name-container'>
            <div className="pin"></div>
            <h1 className='name'>{user.first_name} {user.last_name}</h1>
        </div>

        <div className='post-container'>
            {posts.map((postObj, index) => {
                const post = postObj.data();
                return (
                    <div className="post" key={index}>
                        <div className="pin"></div>
                        <div className='profile-button-container'>
                            <button className='post-edit-button' onClick={() => deletePost(postObj.id)}>Delete</button>
                            <EditPostPopup postObj={postObj} />
                        </div>
                        <h1 className='item-name'>{post.item}</h1>

                        <ImageCarousel urls={post.image_urls} />

                        <p className='location'>{post.location}</p>
                        <p className='caption'>{post.caption}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Profile