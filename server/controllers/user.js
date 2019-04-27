const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');




exports.auth = function(req, res){
	const { email, password } = req.body;

	if( !password || !email){
		res.status(422).send({errors: [{title: 'Data missing!', details: 'Provide email and password!'}]});
	}

	User.findOne({email}, function(err, user){
		if(err){
		return res.status(422).send({  errors: normalizeErrors(err.errors) });
	}

	if(!user) {
		return res.status(422).send({errors: [{title: 'Invalid User', details: 'User does not exixt'}]});
	}

	if (user.hasSamePasswrod(password)){
		
	 const token = jwt.sign({
  		userId: user.id,
  		username: user.username 
		}, config.SECRET, { expiresIn: '1h' }); 

	 return res.json(token);
	}else{
		res.status(422).send({errors: [{title: 'Wrong Data', details: 'Wrong email or password'}]});
	}
 });
}

exports.register = function(req, res){
	
	const { username, email, password, passwordConfirmation } = req.body;

	// const username = req.body.username;
	// const email = req.body.email;
	// const password = req.body.password;
	// const passwordConfimation = req.body.passwordConfimation;


	if( !password || !email){
		res.status(422).send({errors: [{title: 'Data missing!', details: 'Provide email and password!'}]});
	}

	if(password !== passwordConfirmation){
		res.status(422).send({errors: [{title: 'Invalid password', details: 'password are not matched'}]});		
	}

	User.findOne({email}, function(err, existingUser){
		if(err){
		return res.status(422).send({  errors: normalizeErrors(err.errors) });
	}

	if(existingUser){
		return res.status(422).send({errors: [{title: 'Invalid email', details: 'email alredy exixt'}]});	

	}

	const user = new User({
		username,
		email, 
		password
	});

	user.save(function(err){
		if(err){
			return res.status(422).send({ errors: normalizeErrors(err.errors) });	
		}

		return res.json({"register" : true});
	})
})

	// res.json({username, email});
}; 


exports.authMiddleware = function(req, res, next){
	const token = req.headers.authorization;

	if(token){
		const user = parseToken(token);
		User.findById(user.userId, function(err, user){
			if(err){
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}

			if(user){
				res.locals.user = user;
				next();
			} else {
				return notAuthirized(res);
			}
		})
		
		} else {
		return notAuthirized(res);
	}
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthirized(res){
	return res.status(401).send({errors: [{title: 'Not authorized', details: 'You need to login get access'}]});
}