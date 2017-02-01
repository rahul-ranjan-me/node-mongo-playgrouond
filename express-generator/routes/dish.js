var express = require('express'),
	bodyParser = require('body-parser'),
	dishRouter = express.Router();
	
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

module.exports = dishRouter;