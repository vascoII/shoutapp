var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({
   contactPoints: ['127.0.0.1:9042']
});
client.connect(function(err, result){
	console.log("connection Cassandra : user");
});

var getUserByUsername = 'SELECT * FROM shoutapp.users WHERE username = ?';

/* GET single user. */
router.get('/:username', function(req, res){
	client.execute(getUserByUsername, [req.params.username], function(err, result){
		if(err){
  		res.status(404).send({msg:err});
  	} else {
  		res.render('user', {
  			username : result.rows[0].username,
  			email : result.rows[0].email
  		});
  	}
	});
});

module.exports = router;
