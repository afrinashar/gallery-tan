import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPhotos } from '../api';
import PhotoDetails from './PhotoDetails';
import Spinner from '../modules/spinner';
import {Button,Card, Modal,Form,Row,Col,Container,DropdownButton,Dropdown,Image} from 'react-bootstrap';
import DeletePhoto from './DeletePhoto';
//import { CiBoxList } from "react-icons/ci";
const PhotoList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [edit, setEdit] = useState("");
  const [show, setShow] = useState(false);
  const { data: photos, isLoading, isError,isFetching } = useQuery(['photos', searchTerm], () => getPhotos(searchTerm), {staleTime:3000});

  if (isLoading || isFetching) {
    return <><Spinner></Spinner></>
  }

  if (isError) {
    return <div>Error fetching photos</div>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleClose = () => setShow(false);
  // Filter photos based on the search term
  const filteredPhotos = photos.filter((photo) =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  var handleItemClick = (photo) => {
    setEdit(photo)
   //  const{(edit) }= edit
 
  setShow(true)
  };
// console.log( edit,(edit.name),"id")
  // Sorting logic
  // const sortedPhotos = [...filteredPhotos].sort((a, b) => {
  //   const order = sortOrder === 'asc' ? 1 : -1;
  //   return order * a.name.localeCompare(b.name);
  // });
  const handleDownload = (imageUrl, title) => {
      // Create a link element
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${title}.jpg`;
      document.body.appendChild(link);
  
      // Trigger the click event to start the download
      link.click();
  
      // Clean up the link element
      document.body.removeChild(link);
    };
  return (<>
    <div>
      
      

      {/* Search bar */}
     
<nav className="navbar navbar-primary-opacity-50 top-0 bg-body-primary">
  <div className="container-fluid top-0  position-sticky">
    <Link to="/photos/create" className='btn btn-  '>Add Photo</Link><h1 className='text-white'>Photo Gallery</h1>
    <form className="d-flex input-group w-auto">
    <input
   
     className="form-control rounded"
        type="text"
        placeholder="Search photos..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <span className="input-group-text border-0" id="search-addon">
        <i className="fas fa-search"></i>
      </span>
    </form>
  </div>
</nav>
      <div className="row p-5">
        {filteredPhotos.map((photo) => (
          <div className='col-lg-4  col-sm-12 mb-1 mb-lg-0 mt-3' key={photo._id}>
            <Link  className='Link'  onClick={() => handleItemClick(photo)}  >
              <div className='card mh-30 p-2'>
                <img src={photo.imageUrl} alt={photo.title} className="w-100  border border-dark ml-1 shadow-1-strong rounded mb-4" />
                <div className='card-title'>{photo.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
 
    <Modal show={show} key={edit._id} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
         
          <Modal.Title> {edit.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body> <Image    src={edit.imageUrl} fluid /> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleDownload(edit.imageUrl, edit.title)}>
            Download
          </Button>
          
              <DropdownButton    >

      <Dropdown.Item  >    <Link to={`/photos/update/${edit._id}`}>Update</Link> </Dropdown.Item>
      <Dropdown.Item className='bg-danger text-white b-2'  ><Link to={`/photos/delete/${edit._id}`}>Delete</Link></Dropdown.Item>
  
    </DropdownButton>
        </Modal.Footer>
      </Modal>
    </>);
};


export default PhotoList;
