import axios from 'axios';

const getBins = async () => {
  const bins = await axios.get('/api/bins');

  return bins.data;
}

export {
  getBins,
}