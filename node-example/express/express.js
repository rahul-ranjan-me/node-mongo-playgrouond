var express = require('express'),
	http = require('http'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	dishRouter = express.Router(),
	app = express(),
	hostname = 'localhost',
	port = '9999';

app.use(morgan('dev'));

app.use(express.static(__dirname+'/public'));

dishRouter.use(bodyParser.json());

dishRouter.route('/')
	.all((req, res, next) => {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		next();
	})
	.get((req, res, next) => {
		res.end('Will send all dishes!');
	})
	.post((req, res, next) => {
		res.end('Will add' + req.body.name + ' with description '+ req.body.description);	
	})
	.delete((req, res, next) => {
		res.end('Deleting all dishes');		
	});

dishRouter.route('/:dishId')
	.all((req, res, next) => {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		next();
	})
	.get((req, res, next) => {
		res.end('Will send' + req.params.dishId + ' details to you');	
	})
	.put((req, res, next) => {
		res.end('Updating dish no: '+ req.params.dishId + 'with detail' + req.body.name + ' and description '+ req.body.description);
	})
	.delete((req, res, next) => {
		res.end('Will delete' + req.params.dishId + '!');
	});

app.use('/dishes', dishRouter);

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});