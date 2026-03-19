import './createPost.css'
import { useState } from 'react';
import { db, storage } from './firebase' 
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function Post() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [buttonText, setButtonText] = useState("Create Post!")

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
      for (const image of images) {
        //define and get file path
        const imagePath = `images/${Date.now()}-${image.name}`;
        const imageRef = ref(storage, imagePath);

        // upload image
        await uploadBytes(imageRef, image);

        // get URL
        const downloadUrl = await getDownloadURL(imageRef);
        imageUrls.push(downloadUrl);
      };

      await addDoc(collection(db, "posts"), {
        item: formData.get("item"),
        caption: formData.get("caption"),
        location: formData.get("location"),
        user_id: user,
        image_urls: imageUrls,
        created_at: Date.now(),
      });

      //display success message
      setMessage("Post created!");
      setMessageType("success");

      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch(err) {
      console.log(err.message)
      setMessage(err.message);
      return;
    }
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

      <h4 id={messageType}>{message}</h4>
    </div>
  )
}

export default Post