"use strict";

const ObjectID = require('mongodb').ObjectID;
// Simulates the kind of delay we see with network or filesystem operations
//const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    getTweets: function (callback) {
      db.collection("tweets").find().sort({ created_at : -1}).toArray(callback);
    },

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    getTweet: function(idTweet, callback){
      db.collection("tweets").findOne({_id: ObjectID(idTweet)}, callback);
    },

    updateTweetLikes: function(idTweet, likesTweet, callback){
      db.collection("tweets").update({_id: ObjectID(idTweet)}, {$inc: {likes: 1}}, callback);
    }

  }
};