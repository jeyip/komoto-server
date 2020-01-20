var express = require("express");

var app = express();

app.get("/", function(req, res) {
  res.status(200).send("Hello world!!!");
});

app.post("/note", (req, res) => {
  res.status(200).send("Sending note");
});

app.listen(process.env.PORT || 8080, function() {
  console.log("Server is running on PORT:", process.env.PORT || PORT);
});
