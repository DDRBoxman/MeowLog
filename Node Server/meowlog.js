var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs'), querystring = require('querystring');
var util = require('util');

app.listen(3000);

function handler(request, response) {

  if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {

	response.writeHead(200, {'Content-Type': 'text/plain'});
  	response.end('Hello World\n');

	logData = body.split(/\n/);

           io.sockets.emit('news', {hello: logData});
        });
    }else {

	if (request.url.indexOf("LogViewer.apk") != -1) {
		fs.readFile(__dirname + '/LogViewer.apk',
	  function (err, data) {
	    if (err) {
	      response.writeHead(500);
	      return response.end('Error loading index.html');
	    }

	    response.writeHead(200, {'Content-Type': 'binary/octet-stream'});
	    response.end(data);
	  });
		
	} else {
	fs.readFile(__dirname + '/index.html',
	  function (err, data) {
	    if (err) {
	      response.writeHead(500);
	      return response.end('Error loading index.html');
	    }

	    response.writeHead(200);
	    response.end(data);
	  });
	}
    }
    
  
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    
  });
});

