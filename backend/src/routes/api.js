const express = require("express");

const router = express.Router();

const rdb = require('../lib/pg/query');
const ddb = require('../lib/mongo/query');
const SseHandler = require('../lib/sse/handler');

// get all bins
router.get('/bins', async (req, res) => {
  try {
    const bins = await rdb.getAllBins();
    res.json(bins);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/bins', async (req, res) => {
  try {
    const bin = await rdb.addBin();
    console.log(bin);
    res.json(bin);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get one bin and its request previews
router.get('/bins/:bin_id', async (req, res) => {
  try {
    const binId = req.params['bin_id'];
    const binPromise = rdb.getBinById(binId);
    const requestsPromise = rdb.getRequestsWithBinId(binId);

    const [bin, requests] = await Promise.all([binPromise, requestsPromise]);
    
    res.json({
      ...bin,
      requests
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// establish sse connection for specific bin
router.get('/bins/:bin_id/sse', (req, res) => {
  const binId = req.params['bin_id'];
  const handler = SseHandler.handlers[binId] || new SseHandler(binId);
  handler.getSse(req, res);
});

// get details of one request
router.get('/bins/:bin_id/requests/:request_id', async (req, res) => {
  try {
    const mongoId = req.params.request_id;
    const request = await ddb.getRequest(mongoId);
    res.json(request);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete a request
router.delete('/bins/:bin_id/requests/:request_id', async (req, res) => {
  try {
    const mongoId = await rdb.deleteRequest(req.params['request_id']);
    await ddb.deleteRequest(mongoId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// delete a bin
// router.delete('/bins/:bin_id', async (req, res) => {
//   try {
//     endpoint = 1; // when dynamic will retrieve req.params['bin_id']
//     const binId = await rdb.getBin(endpoint);

//     res.sendStatus(200);
//  } catch {
//      res.status(500).send(error.message);
//  }
// });

module.exports = router;
