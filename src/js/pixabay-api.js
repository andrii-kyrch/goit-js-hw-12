import axios from 'axios';

export async function getImages(query, page) {
  const baseURL = 'https://pixabay.com';
  const endPoint = '/api/';
  const url = baseURL + endPoint;

  const params = {
    q: query,
    key: '46359469-7b013fe590d21d7ac02b102d9',
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: 15,
    safesearch: 'true',
  };

  const res = await axios.get(url, { params });
  return res.data;
}
