const rdb = require('../../lib/pg/query');
const ddb = require('../../lib/mongo/query');
const SseHandler = require('../../lib/sse/handler');

function formatRequest(req, endpoint) {
  return { path: formatPath(req.path, endpoint), method: req.method, headers: req.headers, body: req.body };
}

function formatPath(path, endpoint) {
  regex = new RegExp(`/listen/${endpoint}`);
  let newPath = path.replace(regex, "");
  if (newPath === "") {
    return "/";
  }
  return newPath;
}

async function saveRequest(req, res) {
  const endpoint = req.params['endpoint'];
  const binId = await rdb.getBinIdByEndpoint(endpoint);
  const mongoRequest = await ddb.addRequest(formatRequest(req, endpoint));
  const mongoId = String(mongoRequest._id);

  const pgRequest = await rdb.addRequest(binId, mongoId, req.method, formatPath(req.path, endpoint));
  console.log('Added new request', pgRequest);
  if (SseHandler.handlers[binId]) {
    console.log('SSE new request', pgRequest);
    SseHandler.handlers[binId].sendNewRequest(pgRequest);
  }
  res.sendStatus(200);
}

module.exports = saveRequest;
