import './createPost.css'
import { useState } from 'react';
import { db, storage } from './firebase' 
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Post() {
  const defaultButtonText = "Create Post!";
  const [images, setImages] = useState([]);
  const [buttonText, setButtonText] = useState(defaultButtonText);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const feedbackPopupDuration = 1000; // miliseconds for feedback popup to show

  const handleImages = (e) => {
    const images = Array.from(e.target.files);
    if (images.length > 3) {
      setMessage("You can only upload a maximum of 3 images.");
      return;
    }
    setImages(images);
  }
  
  async function uploadPost(e) {
    e.preventDefault();
    setButtonText("Uploading...")

    const formData = new FormData(e.target)
    const imageUrls = [];

    try {
      // for (const image of images) {
      //   //define and get file path
      //   const imagePath = `images/${Date.now()}-${image.name}`;
      //   const imageRef = ref(storage, imagePath);

      //   // upload image
      //   await uploadBytes(imageRef, image);

      //   // get URL
      //   const downloadUrl = await getDownloadURL(imageRef);
      //   imageUrls.push(downloadUrl);
      // };

      // await addDoc(collection(db, "posts"), {
      //   item: formData.get("item"),
      //   caption: formData.get("caption"),
      //   location: formData.get("location"),
      //   user_id: user,
      //   image_urls: imageUrls,
      //   created_at: Date.now(),
      // });

      //display success message
      setFeedbackMessage("Post created successfully!")
      setShowFeedbackPopup(true);
      setTimeout(() => {
        setShowFeedbackPopup(false);
      }, feedbackPopupDuration);

    } catch(err) {
      console.log(err.message);

      //display error message
      setFeedbackMessage("Error uplaoding post.")
      setShowFeedbackPopup(true);
      setTimeout(() => {
        setShowFeedbackPopup(false);
      }, feedbackPopupDuration);

      return;
    }
  }

  const resetForm = () => {
    setImages([]);
    setButtonText(defaultButtonText);
    setFeedbackMessage("");

    document.getElementsByName("item")[0].value = "";
    document.getElementsByName("location")[0].value = "";
    document.getElementsByName("caption")[0].value = "";
  }

  const user = 1;
  
  return (
    <div id='container'>
      <h1>Create Post</h1>

      <form onSubmit={uploadPost}>
        <div id='imagesContainer'>
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt='image'
            />
          ))}
        </div>

        <label id="images-button" for="files">Choose Images</label>
        <input id='files' name='images' type='file' multiple accept='image/*' onChange={handleImages} required hidden />
        <p>Choose up to 3</p>

        <label>Lost Item: </label>
        <input name='item' type="text" placeholder='ex: Green hat' required />
        
        <label>Location: </label>
        <input name='location' type="text" placeholder='ex: Room 101 - Old Main' required />
        
        <label>Caption (optional): </label>
        <textarea name='caption' placeholder='Lost hat' />

        <button type='submit'>{buttonText}</button>
      </form>

      <Popup open={showFeedbackPopup} className='create-post-feedback-popup' onClose={resetForm} >
        <h4>{feedbackMessage}</h4>
      </Popup>
    </div>
  )
}

export default Post