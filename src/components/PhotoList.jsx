import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPhotos } from '../api';
import PhotoDetails from './PhotoDetails';

const PhotoList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: photos, isLoading, isError } = useQuery(['photos', searchTerm], () => getPhotos(searchTerm));

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
           
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching photos</div>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter photos based on the search term
  const filteredPhotos = photos.filter((photo) =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      

      {/* Search bar */}
     
<nav className="navbar navbar-primary-opacity-50 bg-body-primary">
  <div className="container-fluid">
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
          <div className='col-lg-4 col-md-12 mb-1 mb-lg-0 mt-3' key={photo.id}>
            <Link to={`/photos/{id}`} className='Link'  onClick={<PhotoDetails ids={photo._id}/>} >
              <div className='card p-2'>
                <img src={photo.imageUrl} alt={photo.title} className="w-100  border border-dark ml-1 shadow-1-strong rounded mb-4" />
                <div className='card-title'>{photo.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
