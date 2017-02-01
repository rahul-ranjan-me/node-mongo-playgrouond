var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	hostname = 'localhost',
	port = 3000;

var server = http.createServer( (req, res) => {
	console.log('Request for '+ req.url+' by method '+req.method);
	if(req.method == 'GET'){
		var fileUrl;
		if(req.url == '/') fileUrl = '/index.html';
		else fileUrl = req.url;

		var filePath = path.resolve('./public'+fileUrl),
			fileExt = path.extname(filePath);

		if(fileExt === '.html'){
			fs.exists(filePath, (exists) => {
				if(!exists){
					res.writeHead(404, {'Content-Type' : 'text/html'});
					res.end('<h1>Error 404: ' + fileUrl + ' not found </h1>');
					return;
				}

				res.writeHead(200, { 'Content-Type' : 'text/html'});
				fs.createReadStream(filePath).pipe(res);
			});
		}else{
			res.writeHead(404, {'Content-Type' : 'text/html'});
			res.end('<h1>Error 404: ' + fileUrl + ' url not a HTML file </h1>');
		}
	}else{
		res.writeHead(400, {'Content-Type' : 'text/html'});
		res.end('<h1>Error 400: ' + req.method + ' method not supported </h1>');
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});