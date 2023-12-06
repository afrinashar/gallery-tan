// DeletePhoto.js
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deletePhoto } from '../api';

const DeletePhoto = ({}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => deletePhoto(), {
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
