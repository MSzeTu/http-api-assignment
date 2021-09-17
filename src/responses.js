const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'CONTENT-Type': type });
  if (type === 'application/json') { //Stringify object if its JSON
    response.write(JSON.stringify(object));
  } else {
    response.write(object);
  }
  response.end();
};

// Success Code
const success = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This is a successful response',
  };
  // XML case
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, object, 'application/json');
};

// BadRequest Code
const badRequest = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This request has the required parameters',
  };
  let statusCode = 200;
  if (!params.valid || params.valid !== 'true') { //Checks for Parameters
    object.message = 'Missing valid query parameter set to true';
    object.id = 'badRequest';
    statusCode = 400;
  }

  // XML case
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    if (statusCode === 400) {
      responseXML = `${responseXML} <id>${object.id}</id>`;
    }
    responseXML = `${responseXML} </response>`;
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }
  //Default to JSON
  return respond(request, response, statusCode, object, 'application/json');
};

//Unauthorized Code
const unAuthorizedRequest = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'You are logged in and authorized to view',
  };
  let statusCode = 200;

  if (!params.loggedIn || params.loggedIn !== 'yes') { //Checks for Parameters
    object.message = 'Missing loggedIn query parameter set to yes';
    object.id = 'missingAuth';
    statusCode = 401;
  }

  // XML Case
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    if (statusCode === 401) {
      responseXML = `${responseXML} <id>${object.id}</id>`;
    }
    responseXML = `${responseXML} </response>`;
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }
  //Default to JSON
  return respond(request, response, statusCode, object, 'application/json');
};

//Forbidden Code
const forbidden = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'You are forbidden from accessing this content',
    id: 'forbidden',
  };

  // XML Case
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }
  //Default to JSON
  return respond(request, response, 403, object, 'application/json');
};

//Internal Error Code
const internal = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal Error',
  };

  // XML Case
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }
  //Default to JSON
  return respond(request, response, 500, object, 'application/json');
};

//Not Implemented Code
const notImplemented = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This page has not been implemented',
    id: 'notImplemented',
  };

  // XML Case
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }
  //Default to JSON
  return respond(request, response, 501, object, 'application/json');
};


//Not Found Code
const notFound = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // XML Case
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }
  //Default to JSON
  return respond(request, response, 404, object, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unAuthorizedRequest,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
