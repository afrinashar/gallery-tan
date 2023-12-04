import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { createPhoto } from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePhoto = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation(createPhoto, {
    onSuccess: () => {
      console.log('Image created successfully');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error creating image:', error);
    },
  });

  const [photoData, setPhotoData] = useState({
    name: '',
    description: '',
    imageUrl: null,
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    mutation.mutate(photoData);
  };

  const handleClose = () => {
    setPhotoData({
      name: '',
      description: '',
      imageUrl: null,
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPhotoData((prevData) => ({
      ...prevData,
      [name]: name === 'imageUrl' ? files[0] : value,
    }));
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Open Modal
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Profile</Modal.Title>
          <button type="button" className="close" onClick={handleClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <form onSubmit={handleCreate}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text" 
                className="form-control"
                id="name"
                name="name"
                value={photoData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={photoData.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Upload Image:</label>
              <input
                type="file"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Create Image
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePhoto;
