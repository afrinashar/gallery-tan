import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { createPhoto } from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePhoto = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const mutation = useMutation(createPhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries('photos');
      console.log('Image created successfully');
      navigate('/photos');
    },
    onError: (error) => {
      console.error('Error creating image:', error.respose.data);
    },
  });

  const [photoData, setPhotoData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    mutation.mutate(photoData);
    console.log(photoData,(typeof(photoData.imageUrl.name)),(typeof(photoData.imageUrl)),"photooo");
  };

  const handleClose = () => {
    setPhotoData({
      name: '',
      description: '',
      imageUrl: {
        name:""
      },
    });
    setShowModal(false);
    navigate('/photos');
  };

  const handleChange = (e) => {
    const { name, value} = e.target;
   // console.log((e.target),"name:",name,"value:",value,files); 
    setPhotoData((prevData) => ({
      ...prevData,
      [name]: value,


    }  
    ));
  };
const handleChangePhoto=(e)=>{
setPhotoData((prevData)=>({
  ...prevData,
  imageUrl:e.target.files[0]
  
}))
console.log((e.target.files[0].name),"file");
}
  return (
    <div>
    
      <Modal show={showModal} onHide={handleClose}>
        <div  className= "modal-header  " >
          <h3 className=' modal-title bg-primary text-white m-3 '>Create Profile</h3>
          <button type="button" className="close p-2 m-2" onClick={handleClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div >
        <form onSubmit={handleCreate}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="name ">Name:</label>
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
                className="form-control bg-primary"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                //value={photoData.imageUrl}
                onChange={handleChangePhoto}
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
