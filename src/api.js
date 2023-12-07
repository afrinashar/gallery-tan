// api.js
import { useQuery } from 'react-query';

//const API_BASE_URL = 'http://16.171.239.100:3000/';

// export const getPhotos = async () => {
//   const response = await fetch(`${API_BASE_URL}photos`);
//   const data = await response.json();
//   return data;
// };

// export const getPhotoById = async (photoId) => {
//   const response = await fetch(`${API_BASE_URL}photos/${photoId}`);
//   const data = await response.json();
//   return data;
// };
// export const createPhoto = async (photoId) => {
//   const response = await fetch(`${API_BASE_URL}photos/`,photoId);
//   const data = await response.json();
//   return data;
// };
// // Add more API functions for create, update, and delete if needed
// import axios from 'axios';

  const API_BASE_URL = 'http://localhost:3002/';
// api.js
import axios from 'axios';
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getPhotos = async () => {
  const response = await api.get('/photos');
  return response.data;
};
export const getPhotoById = async (photoId) => {
    const response = await api.get(`/photos/${photoId}`);
    return response.data;
  };
export const createPhoto = async (photoData) => {
  const response = await api.post('/photos', photoData);
  return response.data;
};

export const updatePhoto = async (photoId, photoData) => {
  const response = await api.put(`/photos/${photoId}`, photoData);
  return response.data;
};

export const deletePhoto = async (photoId) => {
  const response = await api.delete(`/photos/${photoId}`);
  return response.data;
};