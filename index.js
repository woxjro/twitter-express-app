const TWITTER_API_CLIENT = require("./env");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: TWITTER_API_CLIENT.consumer_key,
  consumer_secret: TWITTER_API_CLIENT.consumer_secret,
  access_token_key: TWITTER_API_CLIENT.access_token_key,
  access_token_secret: TWITTER_API_CLIENT.access_token_secret,
});

var params = { screen_name: "nodejs" };

const getTweets = (params) => {
  client.get("statuses/user_timeline", params, function (
    error,
    tweets,
    response
  ) {
    if (error) throw error;
    console.log(tweets);
  });
};

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  getTweets(params);
  res.send("Hello World!");
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
});

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
