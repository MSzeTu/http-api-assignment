//Require statements
const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = { //URL Structures
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unAuthorizedRequest,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};

const onRequest = (request, response) => { //Onrequest Method 
  const parsedUrl = url.parse(request.url); //Parses URL
  const params = query.parse(parsedUrl.query); //Grabs parameters
  const acceptedTypes = request.headers.accept.split(','); //Grabs accepted Types
 
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.notFound(request, response, params, acceptedTypes); //Defaults to notFound
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
