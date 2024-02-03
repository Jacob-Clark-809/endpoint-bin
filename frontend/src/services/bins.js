import axios from 'axios';

const getBins = async () => {
  const request = await axios.get('/api/bins');

  return request.data;
}

const getBin = async (id) => {
  const request = await axios.get(`/api/bins/${id}`);

  return request.data;
}

export {
  getBins,
  getBin,
}