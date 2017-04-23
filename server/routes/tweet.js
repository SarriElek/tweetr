"use strict";

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const tweetRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetRoutes.put("/:id", function(req, res) {
    if (!req.params.id) {
      res.status(400).json({ error: 'invalid request: no data in PUT params'});
      return;
    }
    const likes = 1; //req.params.likes
    DataHelpers.updateTweetLikes(req.params.id, likes , (err, tweet) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(tweet);
      }
    });
  });

  return tweetRoutes;

}
