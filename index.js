
var _ = require("lodash");
var express = require("express");
var bodyParser = require('body-parser');
var constants = require('./lib/constants');
var CandidatePayload = require('./lib/CandidatePayload');
var Policy = require('./lib/Policy');

var app = express();

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));


var allowMethods = function(req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
}

app.use(allowMethods);

app.post('/api/estimator/:policy', function(req, res, next){
	var requestPayload = req.rawBody;
	var requestPolicy = null; 

	if(typeof requestPayload == "undefined") {
		res.status(400).send('Please post expected input e.g. First Name | Age | Gender | Location | Health Conditions');
	}else{
		requestPayload = new CandidatePayload(requestPayload);

		if(req.params.policy=='tickle'){
			requestPolicy = new Policy(req.params.policy,100);
			_.each(requestPayload.candidates,function(c){
				var estimate = requestPolicy.estimateCandidatePrice(c);
				c.addPolicyEstimate(estimate);
			});
		}
	}

	res.send(requestPayload.candidates);
});

app.listen(constants.APP_PORT, function() {
	console.log("Express listening on port " + constants.APP_PORT);
});
