const fs = require('fs'); // pull in the file system module

//Reads in files for client and style
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const getIndex = (request, response) => { //uses type text.html
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCss = (request, response) => { //Uses type text/css
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = {
  getIndex,
  getCss,
};
