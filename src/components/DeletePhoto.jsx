// DeletePhoto.js
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deletePhoto } from '../api';

const DeletePhoto = ({ photoId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => deletePhoto(photoId), {
    onSuccess: () => {
      queryClient.invalidateQueries('photos');
    },
  });

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
