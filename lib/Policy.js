var _ = require("lodash");
var constants = require('./constants');

var Policy = function(name, basePrice, factors) {
  this.name = name;
  this.basePrice = basePrice || 100;
  this.factors = factors || constants.POLICY_FACTORS;
}

Policy.prototype.estimateCandidatePrice = function(candidate){

    console.log('estimateCandidatePricing');

    var candidateStatus = 'pending';
    var candidatePrice = this.basePrice;

    // apply eligibilty checks
    _.each(this.factors.eligibility,function(f){
        if(candidate[f.name]<f.threshold){
            candidateStatus = 'ineligible';
        }
    });

    console.log('pricing check from base',candidatePrice);

    if(candidateStatus!='ineligible'){
        // apply rules for dollar cost modifications
        _.each(this.factors.cost.dollar,function(f){
            switch(f.rules.condition){
                case 'equals':
                    // Modify the price 
                    // if the candidate's metadata prop. e.g. gender equals the target for this specific rule (e.g. female)
                    if(candidate[f.name]==f.rules.target){
                        candidatePrice += f.price;
                        console.log('dollar equals',candidatePrice,'modfified by',f.price);
                    }
                break;
                case 'interval':
                    // Modify the price based on
                    // calculation of difference between candidate metadata prop and rule baseline
                    var gap = candidate[f.name] - f.rules.baseline;
                    console.log('gap',gap,'based',f.name,f.rules.baseline);
                    var multiplier = Math.floor(gap / f.rules.interval);
                    candidatePrice += (f.price*multiplier);
                    console.log('dollar interval',candidatePrice,'modified by',f.price,multiplier);
                break;
            }
       });
       candidateStatus = 'estimated';
    }

    return {
        name: this.name,
        status: candidateStatus,
        estimated: candidatePrice
    }
};

module.exports = Policy;