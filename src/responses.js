const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'CONTENT-Type': type });
  response.write(JSON.stringify(object));
  response.end();
};

//Success Code
const success = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This is a successful response',
  };
  //XML case
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  //Default JSON Case
  const responseString = JSON.stringify(object);
  console.log(responseString);
  return respond(request, response, 200, responseString, 'application/json');
};

//BadRequest Code
const badRequest = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This request has the required parameters',
  };

  // XML case
  if (acceptedTypes[0] === 'text/xml') {
    if (!params.valid || params.valid !== 'true') { // XML if invalid
      object.message = 'Missing "valid" query parameter set to true';
      object.id = 'badRequest';
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${object.message}</message>`;
      responseXML = `${responseXML} <id>${object.message}</message>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    } // XML if Valid
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // Default JSON case
  if (!params.valid || params.valid !== 'true') {
    object.message = 'Missing "valid" query parameter set to true';
    object.id = 'badRequest';
    const responseString = JSON.stringify(object);
    return respond(request, response, 400, responseString, 'application/json');
  }
  const responseString = JSON.stringify(object);
  return respond(request, response, 200, responseString, 'application/json');
};

const unAuthorizedRequest = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'You are logged in and authorized to view',
  };

  const responseString = JSON.stringify(object);
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    object.message = 'Missing "loggedIn" query parameter set to yes';
    object.id = 'missingAuth';
    return respond(request, response, 401, responseString, 'application/json');
  }
  return respond(request, response, 200, responseString, 'application/json');
};

const forbidden = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'You are forbidden from accessing this content',
    id: 'forbidden',
  };
  const responseString = JSON.stringify(object);
  return respond(request, response, 403, responseString, 'application/json');
};

const internal = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal Error',
  };
  const responseString = JSON.stringify(object);
  return respond(request, response, 500, responseString, 'application/json');
};

const notImplemented = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This page has not been implemented',
    id: 'notImplemented',
  };
  const responseString = JSON.stringify(object);
  return respond(request, response, 501, responseString, 'application/json');
};

const notFound = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  const responseString = JSON.stringify(object);
  return respond(request, response, 404, responseString, 'application/json');
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
