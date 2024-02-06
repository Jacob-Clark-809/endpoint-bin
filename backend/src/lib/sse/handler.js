class SseHandler {
  static handlers = {};

  constructor(binId) {
    SseHandler.handlers[binId] = this;
    this.binId = binId;
    this.clients = [];
  }

  getSse(request, response) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    response.writeHead(200, headers);
    response.write(':\n\n');
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response,
    };
  
    this.clients.push(newClient);
    console.log(`New sse connection: ${clientId}`);
  
    request.on('close', () => {
      console.log(`${clientId}: Sse connection closed`);
      this.clients = this.clients.filter(client => client.id !== clientId);
      if (this.clients.length === 0) {
        delete SseHandler.handlers[this.binId];
      }
    });
  }

  sendNewRequest(request) {
    const message =
      'event: newRequest\n' +
      `data: ${JSON.stringify(request)}` +
      '\n\n';
    
    console.log(message);
    this.#sendMessage(message);
  }

  #sendMessage(message) {
    this.clients.forEach(client => client.response.write(message));
  };
}

module.exports = SseHandler;
