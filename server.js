var http = require("http");
var fs = require("fs");
// var path = require("path");
var url = require("url");
var keys = require('./keys.js')


var server = http.createServer(function (request, response) {
  console.log("request at: " + request.method + " url: " + request.url);
  console.log('keys is working', keys.app_token);
  var data = 
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

var serveIndex = function(request, response){
	var file = request.url.slice(1);
	console.log("file path",file)
	// if (file === ''){
	// 	file = 'app/index.html'
	// }
	file === '' ? file = 'app/index.html' : file = file;
	
	fs.readFile(file, 'utf8', function(err,data){
		// console.log('data from fs.readfile', data)
		if(err){ console.log("your error ", err); 
		} else { sendResponse(response, data); }
	})
};

var options = {
	method: 'GET',
	// url: '/resource/yitu-d5am.json',
	host: 'https://data.sfgov.org/resource/yitu-d5am.json'
	// host: 'https://data.sfgov.org'
};

var callback = function(response) {
  var obj = '';
  response.on('data', function (chunk) {
    obj += chunk;
  });
  response.on('end', function () {
    console.log('obj from fetch (inside callback):', obj);
  });
}

http.request(options, callback).end();

// 	    url: 'https://data.sfgov.org/resource/yitu-d5am.json',
// 	    type: 'GET',
// 	    contentType: 'application/json',
// 	    success: function (data) {
// 	      console.log('Data received', data);
// 	    },
// 	    error: function (data) {
// 	     console.error('No data received', data);
// 	    }
// 	});
// };


// https://data.sfgov.org/resource/yitu-d5am.json
// http://dev.socrata.com/foundry/#/data.sfgov.org/wwmu-gmzc
// https://opendata.socrata.com/profile/Stephanie-Foskitt/n89u-zgug

/* 
title
release_year
locations
fun_facts
production_company
distributor
director
writer
actor_1
actor_2
actor_3
*/