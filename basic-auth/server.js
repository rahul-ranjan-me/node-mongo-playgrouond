var express = require('express'),
	morgan = require('morgan'),
	session = require('express-session')
	FileStore = require('session-file-store')(session),
	hostname = 'localhost',
	port = 3000,
	app = express();

app.use(morgan('dev'));

app.use(session({
	name: 'session-id',
	secret: '12345-67890-09876-54321',
	saveUninitialized: true,
	resave: true,
	store: new FileStore()
}));

var auth = (req, res, next) => {
	console.log(req.headers);
	if(!req.session.user){
		var authHeader = req.headers.authorization;
		if(!authHeader){
			var err = new Error('You are not authenticated!');
			err.status = 401;
			next(err);
			return;
		}

		var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':'),
			user = auth[0],
			pass = auth[1];

		if(user === 'admin' && pass === 'password'){
			req.session.user = 'admin';
			next();
		}else{
			var err = new Error('You are not authenticated!');
			err.status = 401;
			next(err);
		}
	}else{
		if(req.session.user === 'admin'){
			console.log('req.session: ', req.session);
			next();
		}else{
			var err = new Error('You are not authenticated!');
			err.status = 401;
			next(err);
		}
	}

	console.log(req.headers);
}

app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use( (err, req, res, next) => {
	res.writeHead(err.status || 500, {
		'www-Authenticated' : 'Basic',
		'Content-Type' : 'text/plain'
	});
	res.end(err.message);
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});