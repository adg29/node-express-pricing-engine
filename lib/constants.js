module.exports = {
	APP_PORT: 8081,
	POLICY_FACTORS : {
    eligibility: [{
      name: 'age',
      threshold: 18
    }],
    cost: {
      dollar: [{
        name: 'age',
        price: 20,
        rules: {
          condition: 'interval', 
          interval: 5,
          baseline: 18
        }
      }, {
        name: 'gender',
        price: -12,
        rules: {
          condition: 'equals',
          target: 'female'
        }
      }],
      percentage: [{
        name: 'location',
        price: -.05,
        rules: {
          condition: 'equals',
          target: 'East Coast'
        }
      }, {
        name: 'healthConditions',
        price: .01,
        rules: {
          condition: 'equals',
          target: 'Allergies'
        }
      }, {
        name: 'healthConditions',
        price: .06,
        rules: {
          condition: 'equals',
          target: 'Sleep Apnea'
        }
      }, {
        name: 'healthConditions',
        price: .17,
        rules: {
          condition: 'equals',
          target: 'Heart Disease'
        }
      }, {
        name: 'healthConditions',
        price: .08,
        rules: {
          condition: 'equals',
          target: 'High Cholesterol'
        }
      }, {
        name: 'healthConditions',
        price: .04,
        rules: {
          condition: 'equals',
          target: 'Asthma'
        }
      }]
    }
  }
}