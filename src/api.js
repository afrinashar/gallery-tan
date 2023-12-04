// api.js
import { useQuery } from 'react-query';

const API_BASE_URL = 'http://16.171.239.100:3000/';

export const getPhotos = async () => {
  const response = await fetch(`${API_BASE_URL}photos`);
  const data = await response.json();
  return data;
};

export const getPhotoById = async (photoId) => {
  const response = await fetch(`${API_BASE_URL}photos/${photoId}`);
  const data = await response.json();
  return data;
};
export const createPhoto = async (photoId) => {
  const response = await fetch(`${API_BASE_URL}photos/`,photoId);
  const data = await response.json();
  return data;
};
// Add more API functions for create, update, and delete if needed
