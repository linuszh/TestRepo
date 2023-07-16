import React, { ChangeEvent, FormEvent, useState } from 'react';

const ImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Refresh the page to update the image gallery
        window.location.reload();
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('An error occurred while uploading the image', error);
    }
  };

  return (
    <form id="uploadForm" onSubmit={handleUpload}>
      <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;