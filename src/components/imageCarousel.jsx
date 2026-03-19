import React, { useState } from 'react'
import './imageCarousel.css'

function ImageCarousel(props) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const urls = props.urls;
  const numImages = urls.length;

  const changeImage = (newIndex) => {
    setFade(true);

    setTimeout(() => {
      setIndex(newIndex);
      setFade(false);
    }, 400);
  }

  const handleIncrement = () => {
    if (index < numImages - 1) changeImage(index + 1);
  }

  const handleDecrement = () => {
    if (index > 0) changeImage(index - 1);
  }

  return (
    <div className='container'>
      <button className='prev' onClick={handleDecrement}>&#10094;</button>
      <img className={fade ? "fade" : ""} src={urls[index]} />
      <p className='indicator'>{index+1}/{numImages}</p>
      <button className='next' onClick={handleIncrement}>&#10095;</button>
    </div>
  )
}

export default ImageCarousel