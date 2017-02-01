var mongoose = require('mongoose'),
	assert = require('assert'),
	Dishes = require('./models/dishes'),
	url = "mongodb://localhost:27017/dishes";

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
	console.log('Connected correctly to server');

	// var newDish = Dishes({
	// 	name: 'Uthapizza',
	// 	description : 'Test'
	// });

	// newDish.save((err) => {
	// 	if(err) throw err;
	// 	console.log('Dish created');

	// 	Dishes.find({}, (err, dishes) => {
	// 		if(err) throw err;

	// 		console.log(dishes);

	// 		db.collection('dishes').drop(() => {
	// 			db.close();
	// 		});
	// 	});
	// });

	Dishes.create({
		name: 'Uthapizza',
		description: 'Test',
		comments: [
			{
				rating: 3,
				comment: 'This is insane',
				author: 'Matt Daemon'
			}
		]
	}, (err, dish) => {
		if(err) throw err;
		console.log('Dish Created !');
		console.log(dish);
		var id = dish._id;

		setTimeout(() => {
			Dishes.findByIdAndUpdate(id, {
				$set: {
					description : 'Updated test'
				}
			}, 
			{
				new: true
			})
			.exec((err, dish) => {
				if (err) throw err;
				console.log('Updated dish');
				console.log(dish);

				dish.comments.push({
					rating: 5,
					author: 'I am getting a sinking feeling!',
					author: 'Leonardo di Carpaccio'
				});

				dish.save( (err, dish) => {
					console.log('Updated comments');
					console.log(dish);

					db.collection('dishes').drop(() => {
						db.close();
					});
				});
				
			});
			
		}, 3000);

	});


});