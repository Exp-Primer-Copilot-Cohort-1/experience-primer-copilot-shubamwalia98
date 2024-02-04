// Create web server and listen on port 8080

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    response.writeHead(200, {'Content-Type': mime.lookup(filename)});
    fs.createReadStream(filename).pipe(response);
  });
});

// Listen on port 8080
server.listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http://localhost:8080/");
