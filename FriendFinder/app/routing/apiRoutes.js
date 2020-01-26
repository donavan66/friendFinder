var friends = require("./../data/friends");

var express = require("express");
var router = express.Router();

router.get("/api/friends", function(req, res) {
    res.json(friends);
});

router.post("/api/friends", function(req, res) {

    var currentDiff = 0;
    var bestDiff = 40;
    var bestMatch;

    for (var i = 0; i < friends.length; i++) {
        for (var j = 0; j < friends[i].scores.length; j++) {
            currentDiff += Math.abs(parseInt(req.body.scores[j]) - parseInt(friends[i].scores[j]));
        }

        if (currentDiff < bestDiff) {
            bestDiff = currentDiff;
            bestMatch = friends[i];
        } else {
            currentDiff = 0;
        }
    }

    res.json(bestMatch);

    friends.push(req.body);
});

module.exports = router;