import React, { useState, useEffect } from 'react'
import './imageCarousel.css'

function ImageCarousel({ urls }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const urlsSafe = urls || [];
  const numImages = urlsSafe.length;

  useEffect(() => {
    setIndex(0);
  }, [urls]);

  const changeImage = (newIndex) => {
    setFade(true);

    setTimeout(() => {
      setIndex(newIndex);
      setFade(false);
    }, 200); // slightly faster feels less buggy
  }

  const handleIncrement = () => {
    if (index < numImages - 1) changeImage(index + 1);
  }

  const handleDecrement = () => {
    if (index > 0) changeImage(index - 1);
  }

  if (numImages === 0) return null;

  return (
    <div className='container'>
      <button className='prev' onClick={handleDecrement}>&#10094;</button>

      <div className="image-wrapper">
        <img className={fade ? "fade" : ""} src={urlsSafe[index]} />
        <p className='indicator'>{index + 1}/{numImages}</p>
      </div>

      <button className='next' onClick={handleIncrement}>&#10095;</button>
    </div>
  )
}

export default ImageCarousel