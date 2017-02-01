var http = require('http'),
	server = http.createServer(function(req, res){
		res.end('<h1>Server working</h1>');
	});

server.listen(9999);