var MongoClient = require("mongodb").MongoClient,
	assert = require("assert"),
	dboper = require("./operation"),
	url = "mongodb://localhost:27017/dishes";

MongoClient.connect(url, (err, db) =>{
	assert.equal(err, null);
	console.log("Connected correctly to the server");

	dboper.insertDocument(db, { name: "Vadonut", description: "Text"}, "dishes", (result) => {
		console.log(result.ops);

		dboper.findDocuments(db, "dishes", (docs) => {
			console.log(docs);

			dboper.findDocuments(db, "dishes", (docs) => {
				console.log(docs);

				dboper.updateDocument(db, {name: "Vadonut"}, {description: "Updated test"}, "dishes", (result) => {
					console.log(result.result);

					dboper.findDocuments(db, "dishes", (docs) => {
						console.log(docs);

						db.dropCollection("dishes", (result) => {
							console.log(result);
							db.close();
						});

					});

				});

			});

		});

	});
});
