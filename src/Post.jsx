import React, { useState } from 'react'
import { db, storage } from './firebase' 
import { addDoc, collection, doc } from 'firebase/firestore';

function Post() {
  const [images, setImages] = useState([]);
  
  async function uploadPost(formData) {    
    await addDoc(collection(db, "posts"), {
      message: formData.get("caption"),
      place: formData.get("location"),
      user_id: user
    });
  }

  const user = 1;
  
  return (
    <div>
      <h1>Post</h1>
      <form action={uploadPost}>
        <input name='location' placeholder='ex: Room 101 - Old Main' required />
        <input name='caption' placeholder='caption' required />
        <input type='file'  />
        <button type='submit'>Create Post!</button>
      </form>
    </div>
  )
}

export default Post