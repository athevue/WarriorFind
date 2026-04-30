import React, { use, useRef, useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './EditPostPopup.css'
import { deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';

function EditPostPopup(props) {
    const postObj = props.postObj;
    const post = postObj.data();
    const [imageUrls, setImageUrls] = useState(post.image_urls);
    const [showSubmitFeedback, setShowSubmitFeedback] = useState(false);
    const [submitFeedback, setSubmitFeedback] = useState("");
    const [postStatus, setPostStatus] = useState(post.status || "lost");
    const mainRef = useRef();

    const openMainPopup = () => mainRef.current.open();
    const closeMainPopup = () => mainRef.current.close();

    const handleClose = () => {
        //reset the popup to its original state
        setImageUrls(post.image_urls);
        setPostStatus(post.status || "lost");
        closeMainPopup();
    }

    const editPost = (postId) => {
        if (imageUrls.length === 0) {
            setSubmitFeedback("Post must have at least one image");
            setShowSubmitFeedback(true);
            setTimeout(() => {
                setShowSubmitFeedback(false);
            }, 2000);
            return;
        }

        try {
            console.log(imageUrls);
            
            post.image_urls.forEach(async url => {
                if (!(imageUrls.includes(url))) {
                    //delete image
                    const imageRef = ref(storage, url);
                    await deleteObject(imageRef);
                    console.log("deleting ", url)
                }
            });

            updateDoc(doc(db, "posts", postId), {
                item: document.getElementsByName("item")[0].value,
                caption: document.getElementsByName("caption")[0].value,
                location: document.getElementsByName("location")[0].value,
                image_urls: imageUrls,
                status: postStatus
            });

            setShowSubmitFeedback(true);
            setSubmitFeedback("Post edited successfully!")
            setTimeout(() => {
                setShowSubmitFeedback(false);
            }, 2000);

            closeMainPopup();
        } catch(err) {
            console.log(err.message);

            setShowSubmitFeedback(true);
            setSubmitFeedback("Error editing the post.")
            setTimeout(() => {
                setShowSubmitFeedback(false);
            }, 1000);
        }
    }

    const removeImage = (urlToRemove) => {
        //remove the image from screen - does NOT delete in database
        setImageUrls(prev => prev.filter(url => url != urlToRemove))
    }

  return (
    <div>
        <Popup
            ref={mainRef}
            trigger={<button className='post-delete-button'>Edit</button>}
            modal
            className='edit-post-popup'
        >
            <div className='edit-post-popup-container'>
                <h3 className='edit-post-popup-title'>Edit Post</h3>

                <div className='edit-post-popup-image-container'>
                    {imageUrls.map((url, index) => (
                        <div className='edit-post-popup-image-block' key={index}>
                            <button className='edit-post-popup-button edit-post-popup-delete-image-button' onClick={() => removeImage(url)}>Delete</button>
                            <img className='edit-post-popup-image' src={url} />
                        </div>
                    ))}
                </div>

                <label className='edit-post-popup-label'>Item</label>
                <input className='edit-post-popup-input' name='item' defaultValue={post.item} required />

                <label className='edit-post-popup-label'>Location</label>
                <input className='edit-post-popup-input' name='location' defaultValue={post.location} required />

                <label className='edit-post-popup-label'>Caption</label>
                <input className='edit-post-popup-input' name='caption' defaultValue={post.caption} />

                <label className="edit-post-popup-label">Status</label>
                <div className="edit-post-popup-status">
                <button
                    type="button"
                    className={postStatus === "lost" ? "status-active" : ""}
                    onClick={() => setPostStatus("lost")}
                >
                    Lost
                </button>

                <button
                    type="button"
                    className={postStatus === "found" ? "status-active" : ""}
                    onClick={() => setPostStatus("found")}
                >
                    Found
                </button>
                </div>

                <div className='edit-post-popup-button-container'>
                    <button className='edit-post-popup-button' onClick={() => {
                        handleClose();
                    }}>Cancel</button>
                    <button className='edit-post-popup-button' onClick={() => {
                        editPost(postObj.id);
                    }}>Submit</button>
                </div>
            </div>
        </Popup>
        <Popup nested open={showSubmitFeedback} className='edit-post-popup-feedback' position={"top center"}>
            <h2>{submitFeedback}</h2>
        </Popup>
    </div>
  )
}

export default EditPostPopup