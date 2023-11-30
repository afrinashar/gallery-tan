 // PhotoList.js
import React from 'react';
import { useState } from 'react';
import Pagination from '../modules/pagination';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPhotos } from '../api';
import {Spinner,Image   }from 'react-bootstrap';
const PhotoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: photos, isLoading, isError } = useQuery(['photos', currentPage], () => getPhotos(currentPage));

  if (isLoading) {
    return  <div> <Spinner animation="border" variant="primary" /></div>
  }

  if (isError) {
    return <div>Error fetching photos</div>;
  }

  return (
    <div>
      <h2>Photo Gallery</h2>
      <Link to="/photos/create">Add Photo</Link>
      <div class="row">
 
        {photos.map((photo) => (<><div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <Link to={`/photos/${photo.id}`} key={photo.id}>

<Image  className="w-100 shadow-1-strong rounded mb-4" src={photo.imageUrl} alt={photo.title}fluid />
 
          </Link>
      </div> 
        </>))}
      </div> <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default PhotoList;
