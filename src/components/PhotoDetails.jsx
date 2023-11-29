// PhotoDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPhotoById } from './api';

const PhotoDetails = () => {
  const { photoId } = useParams();
  const { data: photo, isLoading, isError } = useQuery(['photo', photoId], () => getPhotoById(photoId));

  if (isLoading) {
    return 1
  }

  if (isError) {
    return <div>Error fetching photo details</div>;
  }

  return (
    <div>
      <h2>{photo.title}</h2>
      <img src={photo.imageUrl} alt={photo.title} />
      <p>{photo.description}</p>
    </div>
  );
};

export default PhotoDetails;
