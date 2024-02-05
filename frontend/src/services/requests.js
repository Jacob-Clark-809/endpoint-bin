import axios from 'axios';

const getRequest = async (binId, requestId) => {
  const response = await axios.get(`/api/bins/${binId}/requests/${requestId}`);

  return response.data;
};

export {
  getRequest,
}