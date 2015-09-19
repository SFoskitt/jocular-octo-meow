var http = require("http");
var https = require('https');
var fs = require("fs");
var url = require("url");
var keys = require('./keys.js')

var port = process.env.PORT || 3000;

var localHeaders = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
	"access-control-allow-headers": "content-type, accept",
	"access-control-max-age": 10,
	'Content-Type': "text/html"
};

var sendResponse = function(response, obj, status){
	status = status || 200;
	response.writeHead(status, localHeaders);
	response.end(obj);
};

var serveIndex = function(request, response){
	var file = request.url.slice(1);
	file === '' ? file = 'app/index.html' : file = file;
	fs.readFile(file, 'utf8', function(err,data){
		if(err){ console.log("your error ", err); 
		} else { sendResponse(response, data); }
	})
};

var callback = function(response) {
	console.log('response code', response.statusCode);
  var obj = '';
  response.on('data', function (chunk, err) {
  	if(err){ console.log('err from response.on', err)} else
    obj += chunk;
  	console.log('chunk is ', chunk)
  });
  response.on('end', function () {
  	console.log('maybe data as obj', obj)
  });
}

var server = http.createServer(function (request, response) {
  serveIndex(request, response);
  });

server.listen(port);

console.log("Server running at", port);

https.get('https://data.sfgov.org/resource/wwmu-gmzc.json', callback);




