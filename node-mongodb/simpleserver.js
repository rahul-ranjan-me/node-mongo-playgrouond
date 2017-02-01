var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	url = 'mongodb://localhost:27017/dishes';

MongoClient.connect(url, (err, db) => {
	assert.equal(err, null);
	console.log("Connected correctly to server");

	var collection = db.collection("dishes");

	collection.insertOne({name: 'Uthapizza', description:'test'},

	function(err, result){
		assert.equal(err, null);
		console.log('After result');
		console.log(result.ops);

		collection.find({}).toArray(function(err, docs){
			assert.equal(err, null);
			console.log("Found");
			console.log(docs);

			db.dropCollection("dishes", function(err, result){
				db.close();
			});
		});
	});
});