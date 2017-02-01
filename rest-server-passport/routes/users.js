var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
	User.register(new User({username: req.body.username}),
		req.body.password, (err, user) => {
			if(err){
				return res.status(500).json({err:err});
			}

			passport.authenticate('local')(req, res, ()=>{
				return res.status(200).json({status: 'Registration Successful!'});
			});
	});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err){
			return next(err);
		}

		if(!user){
			return res.status(401).json({
				err:info
			});
		}

		req.logIn(user, (err) => {
			if(err){
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}

			console.log('User in users: ', user);

			var token = Verify.getToken(user);

			res.status(200).json({
				status: 'Login Successful!',
				success: true,
				token: token
			})
		})
	})(req, res, next);
});

router.get('/logout', (req, res) => {
	req.logout();
	res.status(200).json({
		status: 'Bye!'
	});
});

module.exports = router;
