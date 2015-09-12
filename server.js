var http = require("http");
var fs = require("fs");
// var path = require("path");
var url = require("url");


var server = http.createServer(function (request, response) {
  console.log("request at: " + request.method + " url: " + request.url);
  serveIndex(request, response);
  });

var port = process.env.PORT || 3000;
server.listen(port);
console.log("Server running at (your site) ", port);

var headers = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
	"access-control-allow-headers": "content-type, accept",
	"access-control-max-age": 10,
	'Content-Type': "text/html"
};

var sendResponse = function(response, obj, status){
	status = status || 200;
	response.writeHead(status, headers);
	response.end(obj);
};

var serveFile = function(request, response){

	fs.readFile(**PATH**, 'utf8', function(err,data){
		if(err){ console.log("your error ", err); 
		} else { sendResponse(response, data); }
	})
};