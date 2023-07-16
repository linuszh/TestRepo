import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img src={`/images/${image}`} alt="Uploaded" />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;