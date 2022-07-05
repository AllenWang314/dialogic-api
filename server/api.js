const math = require('mathjs');
const express = require("express");
const { body, validationResult } = require('express-validator');

// helper methods

const diffArray = (arr, n) => {
  finalArray = Array(arr.length - 1);
  for (var i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    finalArray[i] = diff > 0 ? diff : diff + n;
  }
  return finalArray;
}

const computeScore = (sds) => {
  console.log("hi")
  var total = 0;
  var factor = 1.0;
  for (var i = 0; i < sds.length; i++) {
    factor /= (i+1);
    console.log(`factor is ${factor}`)
    total += sds[i] * factor;
  }
  console.log(total)
  return total;
}

const router = express.Router();

router.get("/ping", (_req, res) => {
  return res.send("pong");
});


/*
API DOCUMENTATION
req body: 
  sequence: array of int from 1 through n
  n: int
res body:
  entropy: float value of entropy

validation:
  sequence: (required)
  n cannot exceed 100 (required)
*/
router.post("/entropy",
  body('sequence').exists().isArray(),
  body('n').exists().isInt({
    max: 100
  }),
  (req, res) => {

});


/*
API DOCUMENTATION
req body: 
  sequences: arrays of int from 1 through n
  n: int
  order: int
res body:
  statistics: array of stat objects
    differences: array of difference triangles until order
    sds: array of standard devs until order
    score: sum of sds

validation:
  sequences: (required)
  n cannot exceed 100 (required)
  order cannot exceed 6 (required)
  number of sequences cannot exceed 5 and is at least 2 

warnings:
  if lengths are <= 5: "sequence length may be too short"
  if lengths differ by factor of > 2: "sequence lengths may be too different"
*/
router.post("/sd",
  body('sequences').exists().isArray({ 
    min: 1,
    max: 5
  }),
  body('n').exists().isInt({
    max: 100
  }),
  body('order').exists().isInt({
    max: 6
  }),
  (req, res) => {

    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check no sequence empty
    const sequenceLengths = req.body['sequences'].map(
      (seq) => {
        return seq.length
      }
    )
    if (Math.min(...sequenceLengths) == 0) {
      return res.status(400).json({ errors: [
          {
              "value": req.body['sequences'],
              "msg": "empty sequences",
              "param": "sequences",
              "location": "body"
          }
        ]
      });
    }

    // check that sequence elements fall in range
    for (const seq of req.body['sequences']) {
      for (const element of seq) {
        if (!Number.isInteger(element) || element < 1 || element > req.body['n']) {
          return res.status(400).json({ errors: [
              {
                  "value": req.body['sequences'],
                  "msg": "sequences contain invalid elements",
                  "param": "sequences",
                  "location": "body"
              }
            ]
          });
        }
      }
    }

    const statistics = req.body['sequences'].map((seq) => {
      const differences = Array(req.body['order'] + 1);
      differences[0] = seq;
      for (var i = 0; i < req.body['order']; i++) {
        differences[i + 1] = diffArray(differences[i], req.body['n']);
      }
      
      const sds = differences.map((arr) => {
        return math.std(...arr);
      })

      const score = computeScore(sds);

      return {differences, sds, score}
    })

    return res.send({statistics})
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;