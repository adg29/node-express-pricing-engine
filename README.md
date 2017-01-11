# node-express-pricing-engine
## Pricing Policy

1. The base cost of insurance is $100 annually.
2. For every 5 years over the age of 18 years old, the base price increases by $20. 
3. Life insurance is only available for people over the age of 18. 
4. If a person lives on the East Coast of America, the cost is 5% lower.
5. Females receive a $12 discount on the final price as they have a longer life expectancy.
6. Certain health conditions increase the cost of insurance:

Condition | Relative cost increase
* Allergies | 1%
* Sleep Apnea | 6%
* Heart Disease | 17%
* High Cholesterol | 8%
* Asthma | 4%

## Sample Input

```
First Name | Age | Gender | Location | Health Conditions
Kelly | 50 | female | Boston | Allergies
Josh | 40 | male | Seattle | Sleep Apnea
Jan | 30 | female | New York | Heart Disease, High Cholesterol
Brad | 20 | male | San Francisco | n/a
Petr | 10 | male | Los Angeles | Asthma
```

## Expected Output

```
Kelly's policy is estimated at $199.09
Josh's policy is estimated at $190.8
Jan's policy is estimated at $154.25
Brad's policy is estimated at $100
Petr is not eligible for a life insurance policy
```
