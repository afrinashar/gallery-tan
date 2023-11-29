 // PhotoList.js
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPhotos } from './api';

const PhotoList = () => {
  const { data: photos, isLoading, isError } = useQuery('photos', getPhotos);

  if (isLoading) {
    return  1
  }

  if (isError) {
    return <div>Error fetching photos</div>;
  }

  return (
    <div>
      <h2>Photo Gallery</h2>
      <Link to="/photos/create">Add Photo</Link>
      <div className="photo-list">
        {photos.map((photo) => (
          <Link to={`/photos/${photo.id}`} key={photo.id}>
            <img src={photo.imageUrl} alt={photo.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
