import axios from 'axios';

const getBins = async () => {
  const request = await axios.get('/api/bins');

  return request.data;
}

const getBin = async (id) => {
  const request = await axios.get(`/api/bins/${id}`);

  return request.data;
}

const addBin = async () => {
  const request = await axios.post('/api/bins');

  return request.data;
}

const getSse = (binId) => {
  return new EventSource(`/api/bins/${binId}/sse`);
}

export {
  getBins,
  getBin,
  addBin,
  getSse,
}