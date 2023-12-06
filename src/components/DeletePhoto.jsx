// DeletePhoto.js
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deletePhoto } from '../api';
import { useParams } from 'react-router-dom';

const DeletePhoto = ({}) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const mutation = useMutation(() => deletePhoto(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('photos');
    },
  });
//console.log(photoId,"iddd");
  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div>
      <h2>Delete Photo</h2>
      {/* Your delete confirmation message and button */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeletePhoto;
