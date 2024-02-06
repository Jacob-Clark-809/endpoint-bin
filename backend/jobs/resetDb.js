require('dotenv').config();
const { default: mongoose } = require('mongoose');
const Request = require('../src/lib/mongo/models/request');
const { pgConnect } = require("../src/lib/pg/connection");

const destroyPg = async () => {
  const deleteAllRequests = "DELETE FROM requests";
  await pgConnect(deleteAllRequests);

  const deleteAllBins = "DELETE FROM bins";
  await pgConnect(deleteAllBins);
};

const destroyMongoDb = async () => {
  await Request.deleteMany();
}

const addBin = async () => {
  const endpoint = generateRandomAlphanumeric(12)
    const INSERT_BIN = "INSERT INTO bins (endpoint) " +
                     "VALUES ($1) RETURNING *"
    
    let result = await pgConnect(INSERT_BIN, endpoint);
    return result.rows[0];
}

const addRequestsMongo = async () => {
  const request1 = new Request({
    method: 'GET',
    path: '/',
    headers: {
      "user-agent": "Mozilla/5.0 ",
      "accept-encoding": "gzip, deflate",
      "host": "www.example.com",
      "connection": "close",
    },
  });

  const request2 = new Request({
    method: 'POST',
    path: '/genapp/customers',
    headers: {
      host: 'www.example.com',
      "Content-Type:": 'application/json',
      connection: 'close',
    },
    body: {
       "firstName": "Joe",
       "lastName": "Bloggs",
       "fullAddress": 
          {
              "streetAddress": "21 2nd Street",
              "city": "New York",
              "state": "NY",
              "postalCode": 10021
          }
     },
  });

  const [savedRequest1, savedRequest2] = await Promise.all([request1.save(), request2.save()]);
  return [savedRequest1, savedRequest2];
}

const addRequestPg = async (request, binId) => {
  const mongoId = String(request._id);
  const ADD_REQUEST = "INSERT INTO requests (bin_id, mongo_id, method, path) " +
                       "VALUES ($1, $2, $3, $4)";
  
  await pgConnect(ADD_REQUEST, binId, mongoId, request.method, request.path);
}

const generateRandomAlphanumeric = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  
  return result;
};

(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DDB_URL);

  await Promise.all([destroyPg(), destroyMongoDb()]);
  const bin = await addBin();
  const [request1, request2] = await addRequestsMongo();
  await addRequestPg(request1, bin.id);
  await addRequestPg(request2, bin.id);

  await mongoose.connection.close();
})();
