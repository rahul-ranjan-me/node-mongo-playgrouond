var express = require('express'),
	bodyParser = require('body-parser'),
	dishRouter = express.Router(),
	mongoose = require('mongoose'),
	Dishes = require('../models/dishes');
	
dishRouter.use(bodyParser.json());

dishRouter.route('/')
	.get((req, res, next) => {
		
		Dishes.find({}, (err, dish) => {
			if(err) throw err;
			res.json(dish);
		});

	})
	.post((req, res, next) => {
		Dishes.create(req.body, (err, dish) => {
			if(err) throw err;
			console.log('Dish Created');
			var id = dish._id;
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Added the dish with id: '+id);
		});

	})
	.delete((req, res, next) => {
		Dishes.remove({}, (err, resp) => {
			if(err) throw err;
			res.json(resp);
		});
	});

dishRouter.route('/:dishId')
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId, (err, dish) => {
			if(err) throw err;
			res.json(dish);
		});
	})
	.put((req, res, next) => {
		Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {
			new:true
		}, (err, dish) => {
			if(err) throw err;
			res.json(dish);
		});
	})
	.delete((req, res, next) => {
		Dishes.findByIdAndRemove(req.params.dishId, (err, resp) => {
			if(err) throw err;
			res.json(resp);
		});
	});

dishRouter.route('/:dishId/comments')
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId, (err, dish) => {
			if(err) throw err;
			res.json(dish.comments);
		});
	})
	.post((req, res, next) => {
		Dishes.findById(req.params.dishId, (err, dish) => {
			if(err) throw err;

			dish.comments.push(req.body);
			dish.save((err, dish)=>{
				if(err) throw err;
				res.json(dish);
			});
			
		});
	})
	.delete((req, res, next) => {
		Dishes.findById(req.params.dishId, (err, dish) => {
			if(err) throw err;
			
			for(var i = (dish.comments.length -1); i >=0 ; i--){
				dish.comments.id(dish.comment[i]._id).remove();
			}

			dish.save( (err, result) => {
				if(err) throw err;
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('Deleted all comments!');
			});

		});
	});

dishRouter.route('/:dishId/comments/:commentId')
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId, (err, dish) => {
			if(err) throw err;
			res.json(dish.comments.id(req.params.commentId));
		});
	})
	.put((req, res, next) => {
		Dishes.findById(req.params.dishId, (err, dish) => {
			if(err) throw err;
			dish.comments.id(req.params.commentId).remove();

			dish.comments.push(req.body);
			dish.save((err, dish)=>{
				if(err) throw err;
				res.json(dish);
			})
		});
	})
	.delete((req, res, next) => {
		Dishes.findById(req.params.dishId, (err, dish) => {
			if(err) throw err;
			dish.comments.id(req.params.commentId).remove();

			dish.save((err, resp) => {
				if(err) throw err;
				res.json(resp);
			});
		});
	});

module.exports = dishRouter;