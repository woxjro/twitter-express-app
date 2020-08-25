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
    return tweets;
  });
};

const postTweet = (content) => {
  client.post(
    "statuses/update",
    {
      status: content,
    },
    function (error, tweet, response) {
      if (!error) {
        console.log(tweet);
      } else {
        console.log("error");
      }
    }
  );
};

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res) {
  var tweets = getTweets(params);
  res.send(new Date());
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  const { tweet, date } = req.body;
  postTweet(tweet);
  res.send("done");
});

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
