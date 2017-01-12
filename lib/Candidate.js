var _ = require("lodash");

var Candidate = function(metadata){
	this.policies = [];

	var metadata = 	metadata || {};

	this.spreadMetadata = function(){
		var that = this;
		_.mapKeys(metadata, function (v, k) {
			var cased = _.camelCase(k);
			that[cased] = metadata[k];
			return cased;
		});
	}

	this.spreadMetadata();
}

Candidate.prototype.addPolicyEstimate = function(estimate){
	this.policies.push(estimate);
}



module.exports = Candidate;