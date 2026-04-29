import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { collection, getDocs, query, where, doc, deleteDoc, getDoc } from "firebase/firestore";
import './Profile.css';
import './Feed.css';
import './Home.css';
import ImageCarousel from './components/imageCarousel';
import corkboard from "./assets/cork-board.jpg.avif";
import EditPostPopup from './components/EditPostPopup';
import { getBadges } from "./BadgeSystem";

function Profile() {
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = auth.currentUser?.uid;

    const getUser = async () => {
        if (!userId) return;

        const userDoc = await getDoc(doc(db, "users", userId));

        if (userDoc.exists()) {
            setUser(userDoc.data());
        }
    };

    const getPosts = async () => {
        if (!userId) return;

        setPosts([]);

        try {
            const fetchedPosts = await getDocs(
                query(collection(db, "posts"), where("user_id", "==", userId))
            );

            let postsArray = [];
            fetchedPosts.forEach(post => {
                postsArray.push(post);
            });

            setPosts(postsArray);
        } catch(err) {
            console.log(err.message);
        }
    };

    const deletePost = async (postId) => {
        await deleteDoc(doc(db, "posts", postId));
        setPosts(posts.filter(post => post.id !== postId));
    };

    useEffect(() => {
        const loadProfile = async () => {
            await getUser();
            await getPosts();
            setLoading(false);
        };

        loadProfile();
    }, [userId]);

    if (loading) {
        return <h1>loading...</h1>;
    }

    if (!user) {
        return <h1>No user profile found.</h1>;
    }

    const points = user.points || 0;
    const badges = getBadges(points);

    return (
        <div
            className="home-page profile-container"
            style={{ backgroundImage: `url(${corkboard})` }}
        >
            <div className='post name-container'>
                <div className="pin"></div>
                <h1 className='name'>{user.first_name} {user.last_name}</h1>

                <p className='points'><strong>Total Points:</strong> {points}</p>

                <h2 className='badges-title'>Badges</h2>

                {badges.length === 0 ? (
                    <p>No badges yet.</p>
                ) : (
                    <ul className='badges-list'>
                        {badges.map((badge, index) => (
                            <li className='badge' key={index}>🏅 {badge}</li>
                        ))}
                    </ul>
                )}
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
                    );
                })}
            </div>
        </div>
    );
}

export default Profile;