var _ = require("lodash");
var parse = require("csv-parse/lib/sync");
var Candidate = require('./Candidate');

var options = {delimiter: '|', columns: true, relax_column_count: true, trim: true};

var CandidatePayload = function(input){
	this.input = input || '';
	this.candidates = this.parse(this.input);

}

CandidatePayload.prototype.parse = function(input){
	var toParse = input || this.input;
	var parsed = parse(toParse , options);
	var instantiated = [];

	_.each(parsed,function(metadata){
		var c = new Candidate(metadata);
		instantiated.push(c);
	});

	return instantiated;
}

module.exports = CandidatePayload;