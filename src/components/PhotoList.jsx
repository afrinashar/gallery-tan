import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPhotos } from '../api';
import PhotoDetails from './PhotoDetails';
import Spinner from '../modules/spinner';
import {Button,Card, Modal,Form,Row,Col,Container,DropdownButton,Dropdown,Image} from 'react-bootstrap';
import DeletePhoto from './DeletePhoto';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
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
     
<nav className="navbar   top-0 navbar-light sticky-top bg-primary"  >
  <div className="container-fluid bg-primary top-0  sticky-top">
    <Link to="/photos/create" className='btn btn-outline-light  '>Add Photo</Link><h1 className='text-white'>Photo Gallery</h1>
    <form className="d-flex input-group w-auto">
    <input
   
     className="form-control   rounded"
        type="text"
        placeholder="Search photos..."
        value={searchTerm}
        onChange={handleSearch}
      />
      
    </form>
  </div>
</nav>
      <div className="row p-5">
        {filteredPhotos.map((photo) => (
          <div className='col-lg-4  mh-50 col-sm-12      ' key={photo._id}>
            <Link  className='Link'  onClick={() => handleItemClick(photo)}  >
              <div className='card mh-30 p-3   shadow p-3 mb-5 bg-body rounded'>
                <img src={photo.imageUrl} alt={photo.title} className="mw-100 hover hover-shadow   border-dark ml-1 shadow-1-strong rounded mb-4" />
                <div className='card-title '>{photo.name} {photo.size} {photo.lastModifiedDate}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    
    <a href="mailto:afrinashar1@gmail.com">contact webmaster</a>
    <Modal show={show} key={edit._id} className='shadow p-3 mb-5 bg-body rounded' onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
         
          <Modal.Title className='text-white'> {edit.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body> <div class="bg-image hover-zoom"><Image  className='w-100'   src={edit.imageUrl}  /> </div></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          
          <FaArrowAltCircleDown variant="success"  type="button" onClick={() => handleDownload(edit.imageUrl, edit.title)} ></FaArrowAltCircleDown> 
        
           <a href={edit.imageUrl} download="my_painting.png">   <FaArrowAltCircleDown variant="success"  className='bg-primary' type="button" onClick={() => handleDownload(edit.imageUrl, edit.title)} /> </a>
                <DropdownButton  className=''   >

      <Dropdown.Item   className='bg-primary text-light  ' >    <Link to={`/photos/update/${edit._id}`}>Update</Link> </Dropdown.Item>
      <Dropdown.Item className='bg-primary text-light '  ><Link to={`/photos/delete/${edit._id}`}>Delete</Link></Dropdown.Item>
  
    </DropdownButton>
    <ul class="dropdown-menu" aria-labelledby="dLabel">
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </ul>
    <BsThreeDotsVertical />
        </Modal.Footer>
      </Modal>
    </>);
};


export default PhotoList;
