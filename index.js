const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
});

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
