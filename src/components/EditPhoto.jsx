// EditPhoto.js
import React from 'react';
import { useQuery } from 'react-query';
import { getPhotoById } from '../api';
import { useParams } from 'react-router-dom';

const EditPhoto = ({ }) => {
  const { id } = useParams();
  const { data: photo, isLoading, isError } = useQuery(['photo', id], () => getPhotoById(id));

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (isError) {
    return <div>Error fetching photo details</div>;
  }

  // Add your edit form logic here

  return (
    <div>
      <h2>Edit Photo</h2>
      {/* Your edit form */}
    </div>
  );
};

export default EditPhoto;
