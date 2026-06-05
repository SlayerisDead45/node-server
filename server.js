var http = require("http");
var fs = require("fs");

// this function reads and sends html files
function sendPage(res, filename, statusCode) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(500);
      res.end("Server error");
      return;
    }
    // sending html back to browser
    res.writeHead(statusCode, { "Content-Type": "text/html" });
    res.end(data);
  });
}

// i am creating the server here
var server = http.createServer(function(req, res) {

  // serving css and js files
  if (req.url === "/style.css") {
    fs.readFile("style.css", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
    return;
  }

  if (req.url === "/script.js") {
    fs.readFile("script.js", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(data);
    });
    return;
  }

  // routes
  if (req.url === "/" || req.url === "/home") {
    sendPage(res, "home.html", 200);

  } else if (req.url === "/about") {
    sendPage(res, "about.html", 200);

  } else if (req.url === "/contact") {
    sendPage(res, "contact.html", 200);

  } else {
    // anything else gets a 404
    sendPage(res, "404.html", 404);
  }

});

var port = 3000;
server.listen(port, function() {
  console.log("server running on http://localhost:" + port);
});