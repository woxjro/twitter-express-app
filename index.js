const TWITTER_API_CLIENTS = require("./env");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var Twitter = require("twitter");

const CLIENTS = [];
TWITTER_API_CLIENTS.map((CLIENT) => {
  CLIENTS.push(
    new Twitter({
      consumer_key: CLIENT.consumer_key,
      consumer_secret: CLIENT.consumer_secret,
      access_token_key: CLIENT.access_token_key,
      access_token_secret: CLIENT.access_token_secret,
      bearer_token: CLIENT.bearer_token,
    })
  );
});

var params = { screen_name: "nodejs" };

const getTweets = (client, params) => {
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

const postTweet = (client, content) => {
  client.post(
    "statuses/update",
    {
      status: content,
    },
    function (error, tweet, response) {
      if (!error) {
        console.log(tweet);
      } else {
        console.log(error);
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

app.post("/api/post/:id", (req, res) => {
  const { tweet, date } = req.body;
  const { id } = req.params;
  console.log({
    id: id,
    user_name: TWITTER_API_CLIENTS[id].user_name,
    tweet: tweet,
    date: date,
  });
  //postTweet(CLIENTS[id], tweet);
  res.send("done");
});

app.listen(8000, function () {
  console.log("-----------------running------------------");
});
