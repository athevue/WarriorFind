import React, { useEffect, useState } from 'react'
import './Home.css'
import './Feed.css'
import corkboard from "./assets/Cork-board.jpg.avif";
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import ImageCarousel from './components/imageCarousel';

function Feed() {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        setPosts([]);

        try {
            const fetchedPosts = await getDocs(collection(db, "posts"));

            const postsArray = [];
            fetchedPosts.forEach(post => {
                postsArray.push(post.data());
            });
            setPosts(postsArray);
        } catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

  return (
    <div
        className="home-page"
        style={{ backgroundImage: `url(${corkboard})` }}
    >
        <div className='post-container'>
            {posts.map((post, index) => (
                <div className="post" key={index}>
                    <div className="pin"></div>
                    <h1 className='item-name'>{post.item}</h1>

                    <ImageCarousel urls={post.image_urls} />

                    <p className='location'>{post.location}</p>
                    <p className='caption'>{post.caption}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Feed